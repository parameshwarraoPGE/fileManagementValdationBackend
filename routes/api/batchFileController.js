const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { Readable, Stream } = require('node:stream');


const paramChecker = require('../../libs/checkLib');



const batchFileDataModel = require('../../models/batchFileModel');

//helepr
const { addFileDetailToBatch, deleteFileFromBatch, deleteFilesFromStorage, awsBatchScan, awsFileScan } = require('../../helpers/batch.helper');

/**Fire Base Storage */
let formidable = require('formidable');

//file handling imports
let fs = require("fs");
let zlib = require('zlib');

const archiver = require("archiver");

//fire base imports
let { initializeApp } = require('firebase/app');
let { getStorage, ref, listAll, getStream, uploadBytes, deleteObject, getBytes } = require('firebase/storage');


const config = require('config');
const { blob } = require('stream/consumers');
const firebaseConfigObject = config.get('firebase');

//initialize firebaseapp 
let firebaseAppRef = initializeApp(firebaseConfigObject);
//create firebase storage Ref
let firebaseStorageRef = getStorage(firebaseAppRef);


/**Fire Base Storage */


// @route    POST api/CreateBatch
// @desc     Create a batch
// @access   Private
router.post(
  '/CreateBatch',
  [auth, [
    check('batchName', 'Batch Name is required').not().isEmpty()
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {



      let { body: {
        batchName,
        user
      }
      } = req;

      const batchFile = new batchFileDataModel({
        batchFolderGCPpath: "",
        batchName: batchName,
        batchStatus: "draft",
        createdBy: user,
        fileList: []
      });

      let savedBatchFileDetails = await batchFile.save();

      res.json(savedBatchFileDetails);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/employee
// @desc     Get all employee data
// @access   Private
router.post('/List', auth, async (req, res) => {

  let pagination = 0;
  let skipped = 0;
  let pageSize = 15;

  try {
    if (!paramChecker.isEmpty(req.body.recordPerPage)) {
      pageSize = req.body.recordPerPage;
    }

    if (!paramChecker.isEmpty(req.body.pageIndex)) {
      pagination = (req.body.pageIndex && req.body.pageIndex > 0) ? req.body.pageIndex : 0;
      skipped = pageSize * pagination;
    }

    let query = {};

    if (!paramChecker.isEmpty(req.body.batchId)) {
      query.batchId = new RegExp(req.body.batchId, "i");
    }
    if (!paramChecker.isEmpty(req.body.batchName)) {
      query.batchName = new RegExp(req.body.batchName, "i");
    }
    if (!paramChecker.isEmpty(req.body.batchStatus)) {
      query.batchStatus = new RegExp(req.body.batchStatus, "i");
    }

    if (!paramChecker.isEmpty(req.body.createdBy)) {
      query.createdBy = new RegExp(req.body.createdBy, "i");
    }




    /*let batchFileData = await batchFileDataModel
    .find()
    .skip(skipped)
    .limit(pageSize);
    */

    let batchFileDatas = await batchFileDataModel.aggregate([
      {
        "$facet": {
          "batchFileData": [
            { "$match": query },
            { "$skip": skipped },
            { "$limit": pageSize }
          ],
          "totalCount": [
            { "$match": query },
            {
              "$group": {
                "_id": null,
                "count": { "$sum": 1 }
              }
            }
          ]
        }
      }
    ]);


    res.json(batchFileDatas[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/employee/batchStatusOptions
// @desc     Get all batch status options
// @access   Private
router.get('/batchStatusOptions', auth, async (req, res) => {

  try {
    const uniqueOption = await batchFileDataModel.distinct('batchStatus');


    res.json(uniqueOption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/batchDetail/:id
// @desc     Get batchDetail by ID
// @access   Private
router.get('/batchFileDetail/:id', auth, async (req, res) => {
  try {
    const batchDetail = await batchFileDataModel.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !batchDetail) {
      return res.status(204).json({ message: 'batch details not found!' });
    }

    res.status(200).json(batchDetail);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});



// @route    DELETE api/DeleteBatch/:id
// @desc     Deletes Batch
// @access   Private
router.delete('/deleteBatch/:id', auth, async (req, res) => {
  try {
    let deleteBatchData = await batchFileDataModel.findByIdAndDelete(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !deleteBatchData) {
      return res.status(204).json({ message: 'Batch not found' });
    }
    let filelist = deleteBatchData.fileList.map(fileObject => fileObject.fileName);

    //remove files from GCP
    await deleteFilesFromStorage(filelist, req.params.id, firebaseStorageRef);

    res.status(200).json({ message: 'Batch Removed!' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/updateBatchDetail/:id
// @desc     update batch details 
// @access   Private
router.put('/updateBatchDetail', auth, async (req, res) => {


  try {



    let { body: {
      _id,
      Employee_ID,
      Full_Name,
      Job_Title,
      Department,
      Business_Unit,
      Gender,
      Ethnicity,
      Age,
      Hire_Date,
      Annual_Salary,
      Bonus,
      Country,
      City }
    } = req;

    // Check for ObjectId format and post
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(422).json({ message: 'Invalid params' });
    }

    let udpateEmployeeObject = {
      Employee_ID: Employee_ID,
      Full_Name: paramChecker.nullValueHandler(Full_Name),
      Job_Title: paramChecker.nullValueHandler(Job_Title),
      Department: paramChecker.nullValueHandler(Department),
      Business_Unit: paramChecker.nullValueHandler(Business_Unit),
      Gender: paramChecker.nullValueHandler(Gender),
      Ethnicity: paramChecker.nullValueHandler(Ethnicity),
      Age: paramChecker.nullValueHandler(Age),
      Hire_Date: paramChecker.nullValueHandler(Hire_Date),
      Annual_Salary: paramChecker.nullValueHandler(Annual_Salary),
      Bonus: paramChecker.nullValueHandler(Bonus),
      Country: paramChecker.nullValueHandler(Country),
      City: paramChecker.nullValueHandler(City)
    };
    let employeeData = await batchFileDataModel.findByIdAndUpdate(_id, udpateEmployeeObject);

    if (!employeeData) {
      res.status(204).json({ message: "Employee does not exist!" });
    }

    res.status(200).json(employeeData);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


/**Firebase Storage functions */
/**
 * This is used to list all files present in firebase storage
 */

router.post('/fileList', [
  check('filePath', 'please send file GCP FilePath!!').not().isEmpty()
],
  async (req, res) => {

    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //extract base path

      let { body: { filePath } } = req;

      //set the folder name

      let foldername = `${filePath}`;

      //create firebase reference

      let listRef = ref(firebaseStorageRef, foldername);

      //use list all to get the ref name

      let allFiles = await listAll(listRef);

      let { items } = allFiles;

      //check if files are empty

      if (items.length < 0) {
        return res.status(204).json({ files: [] });
      }

      let filesPath = items.map((fileboject) => {
        return fileboject._location;
      });



      return res.status(200).json({ files: filesPath });

    }
    catch (err) {

      return res.status(500).json({ error: err });

    }
  });


/**
 * This is used to compress and download
 */

router.post('/compressedFileListDownload', [
  check('userPath', 'please send file basePath!!').not().isEmpty(),
  check('compressedFilename', 'please send compressedFileName!!').not().isEmpty()
],
  async (req, res) => {

    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let { body: { userPath: filePath, compressedFilename } } = req;

      let foldername = `${filePath}`;

      let listRef = ref(firebaseStorageRef, foldername);

      //get all file paths using list all

      let allFiles = await listAll(listRef);

      let { items } = allFiles;

      if (items.length < 0) {
        return res.status(204).json({ files: [] });
      }
      //create output compressed file stream

      let outputStream = fs.createWriteStream('fileProcess/compressedFile.zip');

      //create archive 

      let archive = archiver('zip', {
        zlib: { level: 9 }
      });

      //pipe the outstream to archive
      archive.pipe(outputStream);

      let file = items.map((fileboject) => {

        //get the file name
        let filePath = `${fileboject._location.path_}`;

        let fileName = filePath.split('/').pop();

        //create reference
        let firebaseReference = ref(firebaseStorageRef, filePath);

        //get the stream
        let file = getStream(firebaseReference);

        //append the firebae file streams to zip archive

        archive.append(file, { name: fileName });


      });

      res.attachment(`${compressedFilename}.zip`);

      // pipe the zip to response
      archive.pipe(res);

      //complete the archive

      await archive.finalize();

      //set status code

      res.status(200);

      //return response


      return res;

    }
    catch (err) {

      return res.status(500).json({ error: err });

    }
  });

/**
 * single file download
 */

router.post('/singleFileDownload', [
  check('fileName', 'please send the file Name').not().isEmpty(),
  check('batchId', 'please send the batchId!!').not().isEmpty()
],
  async (req, res) => {

    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let { body: { fileName, batchId } } = req;


      let filePath = `${batchId}/${fileName}`;


      //create reference
      let firebaseReference = ref(firebaseStorageRef, filePath);


      let fileArrayBuffer = await getBytes(firebaseReference);
      const fileBuffer = new Buffer.from(fileArrayBuffer);
      res.end(fileBuffer);
      return res;
    }
    catch (err) {

      return res.status(500).json({ error: err });

    }
  });




/**
 * takes form file as input and uploads it GCP firebase storage, 
 */

router.post('/uploadFile',
  async (req, res) => {

    try {


      if (!req.get('filePath')) {
        return res.status(400).json({ error: 'send GCP File path' });
      }

      //start a for to handle incoming file

      let form = new formidable.IncomingForm({
        multiples: true,
        keepExtensions: true
      });

      let uploadFile = await form.parse(req);

      let [Feilds, Files] = uploadFile;

      //get the user name i.e folder name from the header

      let folderDirectory = req.get('filePath');

      let { uploadfiles } = Files;

      //get file name to update in DB
      let fileNamesList = [];

      if (uploadfiles.length > 0) {
        for (let fileobject of uploadfiles) {

          //extract original filename and file path

          let { originalFilename, filepath } = fileobject;

          //set file object

          let fileobjectRef = fileobject;
          // Create a file readable stream
          let readerStream = fs.readFileSync(filepath);
          //set filepath
          let uplaodedFilePath = `${folderDirectory}/${originalFilename}`;

          //create firebase file ref
          let uploadRef = ref(firebaseStorageRef, uplaodedFilePath);

          //upload to firebase

          let uploadStats = await uploadBytes(uploadRef, readerStream);

          fileNamesList.push(originalFilename);
        }
      }

      //folder directory is batchFileID
      addFileDetailToBatch(fileNamesList, folderDirectory);



      return res.status(200).json({ message: "file uploaded", uploaded: true });

    }
    catch (err) {

      return res.status(500).json({ error: err });

    }
  });



//call below to delete the files in GCP Firbasestore

//pass the user name as userpath in req body


router.delete('/deleteFile', [
  check('filesToDelete', 'send files to delete in array').not().isEmpty(),
  check('batchId', 'send the batchId!!').not().isEmpty()
],
  async (req, res) => {

    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //start a for to handle incoming file

      let { body: { filesToDelete, batchId } } = req;

      //container to hold status
      let deleteFileStatus = [];

      if (filesToDelete.length > 0) {
        for (let filename of filesToDelete) {


          //set filepath
          let uplaodedFilePath = `${batchId}/${filename}`;

          //create firebase file ref
          let deleteFileRef = ref(firebaseStorageRef, uplaodedFilePath);

          //upload to firebase

          let deletedFileStatus = await deleteObject(deleteFileRef);
          //update in batch
          await deleteFileFromBatch(filename, batchId);

          //update status 
          deleteFileStatus.push(deletedFileStatus);
        }
      }

      return res.status(200).json({ message: "file deleted!!", fileDeletedStatus: deleteFileStatus });

    }
    catch (err) {

      return res.status(500).json({ error: err });

    }
  });

/**Firebase Storage */

//scanner API's

router.post('/awsFileScan', [
  check('filesToScan', 'send files to delete in array').not().isEmpty(),
  check('batchId', 'send the batchId!!').not().isEmpty()
],
  async (req, res) => {

    try {

      //start a for to handle incoming file

      let { body: { filesToScan, batchId } } = req;

      if (filesToScan.length > 0) {
        for (let filename of filesToScan) {
          await awsFileScan(filename, batchId);
        }
      }


      return res.status(200).json({ message: "files Have Been Scanned!!", fileDeletedStatus: deleteFileStatus });

    }
    catch (err) {

      return res.status(500).json({ error: err });

    }
  });

router.post('/awsBatchScan', [
  check('batchId', 'send the batchId!!').not().isEmpty()
],
  async (req, res) => {

    try {

      //start a for to handle incoming file  
      let { body: { batchId } } = req;

      await awsBatchScan(batchId);


      return res.status(200).json({ message: "All files Have Been Scanned!!", fileDeletedStatus: deleteFileStatus });

    }
    catch (err) {

      return res.status(500).json({ error: err });

    }
  });

module.exports = router;
