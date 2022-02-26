const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender:{
      type:String,
      required:true,
  },
  email:{
      type:String,
      required:true,
  },
  qualification:{
      type:String,
      required:true,
  },
  password:{
    type:String,
    required:true,
  },
  classes:[
    {
        type: Schema.Types.ObjectId,
        ref: "CLASS",
      },
  ]
});

const Teacher = mongoose.model("TEACHER", TeacherSchema);

module.exports = Teacher;