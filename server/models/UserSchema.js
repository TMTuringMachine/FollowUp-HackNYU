const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hasProfile: {
    type: Boolean,
    required: true,
    default: false,
  },
  isTeacher: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPending: {
    type: Boolean,
    required: true,
    default: false,
  },
  education: {
    type: String,
  },
  DateOfBirth: {
    type: Date,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  image: {
    type: String, // Link from cloudinary
  },
  myEnrolledCourses: [
    {
      courseID: {
        type: Schema.Types.ObjectId,
        ref: "COURSE",
      },
      courseProgress: {
        type: Number,
        required: true,
        default: 0,
      },
      order_id: {
        type: String,
        required: true,
      },
      payment_id: {
        type: String,
        required: true,
      },
      payment_signature: {
        type: String,
        required: true,
      },
    },
  ],
  wishList: [
    {
      type: Schema.Types.ObjectId,
      ref: "COURSE",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "COURSE",
    },
  ],
  domain: {
    type: String,
  },
  rating: {
    type: Number,
  },
  idProof: {
    type: String, // Link from cloudinary
  },
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
