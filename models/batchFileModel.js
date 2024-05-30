const mongoose = require('mongoose');

const { v4:uuid } = require('uuid');

const batchFileSchema = new mongoose.Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function () {
      return this._id;
    }    
  },
  batchName: {
    type: String,
  },
  batchStatus: {
    type: String,
  },
  batchFolderGCPpath: {
    type: String,
  },
  createdBy: {
    type: String
  },
  fileList: [{
    fileName: {
      type: String
    },
    gcpFilePath: {
      type: String
    },
    department: {
      type: String,
      default: "general"
    },
    isTextExtractScanned: {
      type: Boolean,
      default: true
    },
    fileStatus: {
      type: String
    },
    scannedData: [
      {
        pageNumber: {
          type: Number
        },
        dataExtracted:[
          {
            feildName:{
              type: String
            },
            feildKey: {
              type: String
            },
            feildValue: {
              type: String
            },
            inputType: {
              type: String
            },
            inputOptions: []
          }
        ]
      }
    ]
  }]

});

module.exports = Profile = mongoose.model('batchFileSchema', batchFileSchema, 'batchFileData');
