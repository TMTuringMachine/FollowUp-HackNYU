const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  gender:{
      type:String,
      required:true,
  },
  password:{
      type:String,
      required:true,
  },
  class:{
    type: Schema.Types.ObjectId,
    ref: "CLASS",
  },
  phone:{
    type:Number
  },
  tests:[
    {
        type: Schema.Types.ObjectId,
        ref: "TEST",
      },
  ],
  attendance:[{
    date:{
        type:Date,
    },
    isPresent:{
        type:Boolean,
    }
  }]

});

const Student = mongoose.model("STUDENT", StudentSchema);

module.exports = Student;
