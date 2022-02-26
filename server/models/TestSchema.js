const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: [{
        type: Schema.Types.ObjectId,
        ref: "SUBJECT",
  }],
  classID: {
    type: Schema.Types.ObjectId,
    ref: "CLASS",
  },
  date: {
    type: String,
    required:true
  },
  time:{
    type:String,
    required:true
  }
});

const Test = mongoose.model("TEST", TestSchema);

module.exports = Test;
