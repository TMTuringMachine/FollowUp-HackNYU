const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  totalMarks:{
      type:Number,
      default:100,
  },
});

const Subject = mongoose.model("SUBJECT", SubjectSchema);

module.exports = Subject;