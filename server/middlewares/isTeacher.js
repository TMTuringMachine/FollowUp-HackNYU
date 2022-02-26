const { jwtVerify } = require("../controllers/teachers");
const Teacher = require("../models/TeacherSchema");
const isTeacher = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .send("Authorization denied, please register as teacher");
  }
  try {
    const teacher = jwtVerify(token, process.env.JWT_PRIVATE_KEY);

    req.teacher = teacher;
    console.log("in student middleware");
    next();
  } catch (e) {
    return res.status(402).send(e.message);
  }
};

module.exports = {
  isTeacher,
};
