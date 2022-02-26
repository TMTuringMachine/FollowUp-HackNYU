const Teacher = require("../models/TeacherSchema");
const Class = require("../models/ClassSchema");
const Subject = require("../models/SubjectSchema");
const Test = require("../models/TestSchema")
require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  var { name, email, gender, qualification, password, cpassword } = req.body;
  if (!name || !email || !gender || !qualification || !password || !cpassword)
    res.status(422).send("Enter all fields");
  try {
    const teacherExists = await Teacher.findOne({ email: email });
    if (teacherExists) {
      res.status(422).send("User with this email already exists");
    } else if (password !== cpassword) {
      res.status(422).send("Passwords do not match");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      const teacher = new Teacher({
        name,
        email,
        gender,
        qualification,
        password,
      });
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
    const teacherLogin = await Teacher.findOne({ email: email });
    if (teacherLogin) {
      const isValid = await bcrypt.compare(password, teacherLogin.password);
      if (!isValid) {
        res.status(200).json({ ok: false, message: "Incorrect Credentials" });
      } else {
        const token = jwt.sign(
          {
            _id: teacherLogin._id,
            name: teacherLogin.name,
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
          teacherLogin,
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
    const teacher = await Teacher.findById(decodeToken._id);
    //   .populate(
    //     "myEnrolledCourses.courseID"
    //   );
    return res.send({ teacher });
  }
  res.send(null);
};

const createClass = async (req, res) => {
  const { name, teacher } = req.body;
  try {
    if (!name || !teacher)
      res.status(200).json({ ok: false, message: "Enter All Details" });
    const teacherExists = Teacher.findById(teacher);
    if (teacherExists) {
      const classExists = await Class.findOne({ name });
      if (!classExists) {
        const newClass = new Class({ name, teacher });
        const saveClass = await newClass.save();
        if (saveClass)
          res
            .status(200)
            .send({ ok: true, message: "Class Created Successfully!" });
        else
          res
            .status(200)
            .send({ ok: false, message: "Failed to Create Class" });
      } else {
        res.status(200).send({ ok: false, message: "Class Already Exists!" });
      }
    } else {
      res.status(200).send({ ok: false, message: "Teacher Doesnt Exists!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addSubject = async (req,res)=>{
    const {name,totalMarks,classID} = req.body;
    try {
      if(!name) res.status(200).send({ ok: false, message: "Enter All Fields" });
      const subjectExists = await Subject.findOne({name})
      if(!subjectExists){
        const newSubject = new Subject({name,totalMarks,classID});
        const saveSubject = await newSubject.save();
        if(saveSubject) res.status(200).send({ ok: true, message: "New Subject Added!" });
      }else{
        res.status(200).send({ ok: false, message: "Subject Already Exists!" });
      }
    } catch (error) {
      
    }
}

const addTest = async(req,res)=>{
  const {name,subjects,classID,date,time} = req.body
  try {
    if(!name || !subjects || !classID || !date || !time) res.status(200).send({ ok: false, message: "Enter All Fields" });

    const testExists = await Test.findOne({name})
    if(!testExists){
      const newTest = new Test({name,subjects,classID,date,time})
      const saveTest = await newTest.save();

      if(saveTest) res.status(200).send({ ok: true, message: "Test Added!" });
    }else{
      res.status(200).send({ ok: false, message: "Test Already Exists" });
    }
  } catch (error) {
    console.log(error)
  }
}



module.exports = {
  signup,
  login,
  jwtVerify,
  createClass,
  addSubject,
  addTest
};
