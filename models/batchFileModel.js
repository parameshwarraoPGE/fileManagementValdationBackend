const mongoose = require('mongoose');



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
  createdBy: {
    type: String
  },
  fileList: [{
    fileName: {
      type: String
    },    
    isTextExtractScanned: {
      type: Boolean,
      default: true
    },
    fileStatus: {
      type: String,
      default: "Awaiting_Validation"
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
            inputOptions: [
              {
                feildName: String,
                feildValue: String
              }
            ]
          }
        ]
      }
    ]
  }]

});

module.exports = Profile = mongoose.model('batchFileSchema', batchFileSchema, 'batchFileData');
