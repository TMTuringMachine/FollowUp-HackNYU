const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "STUDENT",
    },
  ],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "TEACHER",
  },
  announcement: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "SUBJECT",
    },
  ],
  feedback: [
    {
      rating: Number,
      Text: String,
    },
  ],
  tests:[
    {
      type:Schema.Types.ObjectId,
      ref:'TEST',
    }
  ]
});

const Class = mongoose.model("CLASS", ClassSchema);

module.exports = Class;
