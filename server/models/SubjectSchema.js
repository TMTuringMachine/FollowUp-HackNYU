const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "CLASS",
  },
  // classID:[
  //   {type:Schema.Types.ObjectId,
  //   ref:"CLASS"},
  // ]
});

const Subject = mongoose.model("SUBJECT", SubjectSchema);

module.exports = Subject;
