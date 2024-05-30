const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const paramChecker = require('../../libs/checkLib');



const batchFileDataModel = require('../../models/batchFileModel');


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
        batchFolderGCPpath:"",
        batchName: batchName,
        createdBy: user,
        fileList:[]
      });

      let savedBatchFileDetails = await batchFile.save();      

      res.json(batchFile);

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


// @route    GET api/employeeDetail/:id
// @desc     Get employeeDetail by ID
// @access   Private
router.get('/batchFileDetail/:id', auth, async (req, res) => {
  try {
    const employeeDetail = await batchFileDataModel.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !employeeDetail) {
      return res.status(204).json({ message: 'employee details not found!' });
    }

    res.status(200).json(employeeDetail);
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

module.exports = router;
