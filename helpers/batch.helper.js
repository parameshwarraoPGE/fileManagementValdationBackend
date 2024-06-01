const batchFileDataModel = require('../models/batchFileModel');
//fire base imports
let { initializeApp } = require('firebase/app');
let { getStorage, ref, listAll, getStream, uploadBytes , deleteObject } = require('firebase/storage');


const config = require('config');
const firebaseConfigObject = config.get('firebase');

//initialize firebaseapp 
let firebaseAppRef = initializeApp(firebaseConfigObject);
//create firebase storage Ref
let firebaseStorageRef = getStorage(firebaseAppRef);

let deleteFileFromBatch = async (fileName, batchId) => {
  try {
    let batchFileDetail = await batchFileDataModel.findById(batchId);

    if(batchFileDetail && batchFileDetail.fileList && batchFileDetail.fileList.length > 0){
    const index = batchFileDetail.fileList
    .map(fileObj => fileObj.fileName.toLowerCase())
    .indexOf(fileName.toLowerCase());
    if (index > -1) { 
      batchFileDetail.fileList.splice(index, 1);
      batchFileDetail.save();
    }

    }
    
  } catch (err) {
    throw err;
  }
};

let addFileDetailToBatch = async (fileList = [], batchId) => {
  try {

    let batchFileDetail = await batchFileDataModel.findById(batchId);

    // Check for ObjectId format and post
    if (batchFileDetail) {
      fileList.map((uploadedFileName) => {
        let fileDetail = {
          fileName: uploadedFileName,
          isTextExtractScanned: false,
          fileStatus: "Awaiting_Validation",
          scannedData: []
        };
        
        batchFileDetail.fileList.push(fileDetail);
      }); 
     await batchFileDetail.save();    

    }
  } catch (err) {
    throw err;
  }
};

let deleteFilesFromStorage = async (fileList = [], batchId, firebaseStorageRef ) => {
  try {
    for(filename of fileList){
      //set filepath
      let uplaodedFilePath = `${batchId}/${filename}`;
      //create firebase file ref
      let fileRef = ref(firebaseStorageRef, uplaodedFilePath);

      //upload to firebase
      await deleteObject(fileRef);
    }    
  } catch (err) {
    throw err;
  }
};


/**
   * exporting functions.
   */
module.exports = {
  deleteFileFromBatch: deleteFileFromBatch,
  addFileDetailToBatch : addFileDetailToBatch,
  deleteFilesFromStorage: deleteFilesFromStorage
};