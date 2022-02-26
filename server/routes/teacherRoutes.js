const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  jwtVerify,
  createClass,
  addSubject,
  addTest
} = require("../controllers/teachers");

router.post("/signup", signup);
router.post("/login", login);
router.get("/jwtVerify", jwtVerify);
router.post("/createClass", createClass);
router.post("/addSubject", addSubject);
router.post("/addTest",addTest)


module.exports = router;