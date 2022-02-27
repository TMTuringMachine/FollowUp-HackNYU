const Teacher = require("../models/TeacherSchema");
const Class = require("../models/ClassSchema");
const Subject = require("../models/SubjectSchema");
const Test = require("../models/TestSchema");
const Student = require("../models/StudentSchema");

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
            expiresIn: "1400000000m",
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
    const teacherExists = await Teacher.findById(teacher);
    if (teacherExists) {
      const classExists = await Class.findOne({ name });
      if (!classExists) {
        const newClass = new Class({ name, teacher });
        const saveClass = await newClass.save();
        if (saveClass) {
          teacherExists.classes.push(saveClass._id);
          const updatedTeacher = await Teacher.findByIdAndUpdate(teacher, {
            classes: teacherExists.classes,
          });
          if (updatedTeacher)
            res
              .status(200)
              .send({
                ok: true,
                message: "Class Created Successfully!",
                saveClass,
              });
        } else
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

const addSubject = async (req, res) => {
  const { name, totalMarks, classID } = req.body;
  try {
    if (!name) res.status(200).send({ ok: false, message: "Enter All Fields" });
    const subjectExists = await Subject.findOne({ name });
    if (!subjectExists) {
      const newSubject = new Subject({ name, totalMarks, classID });
      const saveSubject = await newSubject.save();
      if (saveSubject) {
        const AppendInClass = await Class.findById(classID);
        AppendInClass.subjects.push(saveSubject._id);
        const updated = await Class.findByIdAndUpdate(classID, {
          subjects: AppendInClass.subjects,
        });
        res.status(200).send({ ok: true, message: "New Subject Added!" });
      }
    } else {
      res.status(200).send({ ok: false, message: "Subject Already Exists!" });
    }
  } catch (error) {}
};

const addTest = async (req, res) => {
  const { name, subjects, classID, date, time } = req.body;
  try {
    if (!name || !subjects || !classID || !date || !time)
      res.status(200).send({ ok: false, message: "Enter All Fields" });

    const testExists = await Test.findOne({ name });
    if (!testExists) {
      const newTest = new Test({ name, subjects, classID, date, time });
      const saveTest = await newTest.save();

      const classRef = await Class.findById(classID);
      classRef.tests.push(saveTest);

      await classRef.save();

      if (saveTest) res.status(200).send({ ok: true, message: "Test Added!" });
    } else {
      res.status(200).send({ ok: false, message: "Test Already Exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllStudentsInClass = async (req, res) => {
  const { classID } = req.params;
  try {
    const students = await Student.find({ class: classID });
    if (students)
      res
        .status(200)
        .send({ ok: true, message: "Students Enrolled in Class", students });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    if (students)
      res
        .status(200)
        .send({ ok: true, message: "All Students Enrolled", students });
  } catch (error) {
    console.log(error);
  }
};

const setMarksOfStudent = async (req, res) => {
  const { testID, subjects, studentID } = req.body;
  try {
    const isTest = await Test.findById(testID);
    if (isTest) {
      const currentStudent = await Student.findById(studentID);

      currentStudent.tests.push({
        test: testID,
        subjects,
      });

      const addMarks = await Student.findByIdAndUpdate(studentID, {
        tests: currentStudent.tests,
      });
      if (addMarks) res.status(200).send({ ok: true, message: "Marks Added!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const markAttendance = async (req, res) => {
  const { studentID, date, isPresent } = req.body;
  try {
    const currentStudent = await Student.findById(studentID);
    if (currentStudent) {
      currentStudent.attendance.push({
        date,
        isPresent,
      });

      const mark = await Student.findByIdAndUpdate(studentID, {
        attendance: currentStudent.attendance,
      });
      if (mark)
        res.status(200).send({ ok: true, message: "Attendance Marked" });
    }
  } catch (error) {}
};

const deleteClass = async (req, res) => {
  const { classID, teacherID } = req.body;
  try {
    const getClass = await Class.findById(classID);
    if (getClass) {
      if (getClass.teacher == teacherID) {
        const deleteClass = await Class.findByIdAndDelete(classID);
        if (deleteClass) res.send({ ok: true, message: "Class Deleted" });
      } else {
        res.send({ ok: false, message: "This Class Doesnt Belong To You" });
      }
    } else {
      res.send({ ok: false, message: "Class doesnt Exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

const removeStudent = async (req, res) => {
  const { classID, studentID, teacherID } = req.body;
  try {
    const getClass = await Class.findById(classID);
    if (getClass) {
      if (getClass.teacher == teacherID) {
        const index = getClass.students.indexOf(studentID);
        getClass.students.splice(index, 1);
        const updated = await Class.findByIdAndUpdate(classID, {
          students: getClass.students,
        });
        if (updated) {
          const delTeacherFromStudent = await Student.findByIdAndUpdate(
            studentID,
            { class: null }
          );
          if (delTeacherFromStudent)
            res.send({ ok: true, message: "Student Removed From Class" });
        } else {
          res.send({ ok: false, message: "Failed" });
        }
      } else {
        res.send({ ok: false, message: "This Class Doesnt Belong To You" });
      }
    } else {
      res.send({ ok: false, message: "Class doesnt Exist" });
    }
  } catch (error) {}
};

const getAllClasses = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const getClasses = await Teacher.findById(id).populate("classes");
    if (getClasses) {
      res.send({ ok: true, message: "successful", getClasses });
    }
  } catch (error) {
    console.log(error);
  }
};

const getOneClass = async (req, res) => {
  const { classID } = req.params;
  try {
    const getClass = await Class.findById(classID)
      .populate("students")
      .populate("subjects");
    if (getClass) {
      res.send({ ok: true, message: "Got One Class", getClass });
    }
  } catch (error) {
    console.log(error);
  }
};

const addAnnouncement = async (req, res) => {
  const { title, description, classID } = req.body;
  try {
    const existing = await Class.findById(classID);
    if (existing) {
      existing.announcement.push({
        title,
        description,
      });
      const add = await Class.findByIdAndUpdate(classID, {
        announcement: existing.announcement,
      });
      if (add) res.send({ ok: true, message: "Announcement Added" });
      else {
        res.send({ ok: false, message: "Announcement Failed" });
      }
    } else {
      res.send({ ok: false, message: "Class Doesnt Exist" });
    }
  } catch (error) {}
};

const deleteAnnouncement = async (req, res) => {
  const { id, classID } = req.body;
  try {
    const deleteAnnouncement = await Class.findById(classID);
    if (deleteAnnouncement) {
      for (var i = 0; i < deleteAnnouncement.announcement.length; i++) {
        if (deleteAnnouncement.announcement[i]._id == id)
          deleteAnnouncement.announcement.splice(i, 1);
      }
      const updated = await Class.findByIdAndUpdate(classID, {
        announcement: deleteAnnouncement.announcement,
      });
      if (updated) res.json({ ok: true, message: "Announcement Deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllAnnouncements = async (req, res) => {
  const { id } = req.params;
  try {
    const all = await Class.findById(id);
    if (all) {
      const annuncements = all.announcement;
      res.send({ ok: true, message: "All Announcements", annuncements });
    }
  } catch (error) {}
};

module.exports = {
  signup,
  login,
  jwtVerify,
  createClass,
  addSubject,
  addTest,
  getAllStudents,
  getAllStudentsInClass,
  setMarksOfStudent,
  markAttendance,
  deleteClass,
  removeStudent,
  getAllClasses,
  getOneClass,
  addAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
};
