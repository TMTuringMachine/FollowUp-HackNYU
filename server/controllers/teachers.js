const Teacher = require("../models/TeacherSchema");
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
    console.log("in jwtVerify");
    return res.send({ teacher });
  }
  res.send(null);
};

module.exports = {
  signup,
  login,
  jwtVerify,
};
