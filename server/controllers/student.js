const Student = require("../models/StudentSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  var { name, email, gender, phone, password, cpassword } = req.body;
  if (!name || !email || !gender || !phone || !password || !cpassword)
    res.status(422).send("Enter all fields");
  try {
    const studentExists = await Student.findOne({ email: email });
    if (studentExists) {
      res.status(422).send("User with this email already exists");
    } else if (password !== cpassword) {
      res.status(422).send("Passwords do not match");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      const teacher = new Student({ name, email, gender, phone, password });
      const saveTeacher = await teacher.save();
      if (saveTeacher) res.status(200).send("User created successfully");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      return res
        .status(200)
        .send({ ok: false, message: "Email or password cannot be blank" });
    }
    const studentLogin = await Student.findOne({ email: email });
    if (studentLogin) {
      const isValid = await bcrypt.compare(password, studentLogin.password);
      if (!isValid) {
        res.status(200).json({ ok: false, message: "Incorrect Credentials" });
      } else {
        const token = jwt.sign(
          {
            _id: studentLogin._id,
            name: studentLogin.name,
          },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "300m",
          }
        );
        return res.status(200).json({
          ok: true,
          message: "Login Successfull!",
          token,
          studentLogin,
        });
      }
    } else {
      res.status(200).send({ ok: false, message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

const jwtVerify = async (req, res) => {
  const token = req.headers.authorization;
  console.log(`token: ${token}`);
  if (!token) {
    return res.send(null);
  }

  const decodeToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (decodeToken) {
    const student = await Student.findById(decodeToken._id);
    //   .populate(
    //     "myEnrolledCourses.courseID"
    //   );
      return res.send({ student });
    }
    res.send(null);
  };

  const joinClassByID = async(req,res)=>{
    const {classID,studentID} = req.body;
    try {
      const getStudent = await Student.findById(studentID)
      if(getStudent){
        const updateStudent = await Student.findByIdAndUpdate(getStudent._id,{class:classID})
        if(updateStudent) res
        .status(200)
        .json({ ok: true, message: "Class Joined",updateStudent});
      }else{
        res
            .status(200)
            .json({ ok: false, message: "Student Doesnt Exist" });
      }
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = {
    signup,
    login,
    jwtVerify,
    joinClassByID
  };
