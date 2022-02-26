const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: [
    {
      subject: {
        type: Schema.Types.ObjectId,
        ref: "SUBJECT",
      },
      marks: {
        type: Number,
      },
    },
  ],
  classID: {
    type: Schema.Types.ObjectId,
    ref: "CLASS",
  },
  date: {
    type: Date,
  },
});

const Test = mongoose.model("TEST", TestSchema);

module.exports = Test;