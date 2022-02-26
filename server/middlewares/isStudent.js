import { jwtVerify } from "../controllers/teachers";
import Student from "../models/StudentSchema";

const isStudent = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).send("Authorization denied, please register");
  }

  try {
    const decodeToken = jwtVerify(token, process.env.JWT_PRIVATE_KEY);
    const student = Student.findById(decodeToken._id);
    req.student = student;
    console.log("in student middleware");
    next();
  } catch (e) {
    return res.status(401).send(e.message);
  }
};

module.exports = {
  isStudent,
};
