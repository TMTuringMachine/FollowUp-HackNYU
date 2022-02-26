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
} = require("../controllers/teachers");

router.post("/signup", signup);
router.post("/login", login);
router.get("/jwtVerify", jwtVerify);
router.post("/createClass", isTeacher, createClass);
router.post("/addSubject", isTeacher, addSubject);
router.post("/addTest", isTeacher, addTest);

module.exports = router;
