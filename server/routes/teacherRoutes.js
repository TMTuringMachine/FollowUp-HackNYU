const express = require("express");
const router = express.Router();
const { isTeacher } = require("../middlewares/isTeacher");

const {
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
  getOneTest
} = require("../controllers/teachers");

router.post("/signup", signup);
router.post("/login", login);
router.get("/jwtVerify", jwtVerify);
router.post("/createClass", createClass);
router.post("/addSubject", addSubject);
router.post("/addTest", addTest);
router.get("/getAllStudents/:classID", getAllStudentsInClass);
router.get("/getAllStudents", getAllStudents);
router.post("/setMarks",setMarksOfStudent)
router.post("/markAttendance",markAttendance)
router.post("/deleteClass",deleteClass)
router.post("/removeStudent",removeStudent)
router.get("/getAllClasses/:id",getAllClasses)
router.get("/getOneClass/:classID",getOneClass)
router.post("/addAnnouncement",addAnnouncement)
router.post('/deleteAnnouncement',deleteAnnouncement)
router.get("/getAllAnnouncements/:id",getAllAnnouncements)
router.get('/getOneTest/:testId',getOneTest)


module.exports = router;
