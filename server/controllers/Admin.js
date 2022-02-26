// const bcrypt = require("bcrypt");
// var jwt = require("jsonwebtoken");
// const User = require("../models/UserSchema");

// const signup = async (req, res) => {
//   var { name, email, phone, password, cpassword } = req.body;
//   console.log(req.body);
//   if (!name || !email || !phone || !password || !cpassword)
//     res.status(422).send("Enter all fields");
//   try {
//     const adminExists = await Admin.findOne({ email: email });
//     const userExists = await User.findOne({ email: email });
//     if (adminExists) {
//       res.status(422).send("Admin with this email already exists");
//     } else if (userExists) {
//       res
//         .status(422)
//         .send("User with this email already exists. Please Login as a User");
//     } else if (password !== cpassword) {
//       res.status(422).send("Passwords do not match");
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       password = hashedPassword;
//       const admin = new Admin({ name, email, phone, password });
//       const saveAdmin = await admin.save();
//       if (saveAdmin) res.status(200).send("Admin created successfully");
//     }
//   } catch (error) {
//     console.log("Error", error);
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       return res.status(200).send("Email or password cannot be blank");
//     }
//     const AdminLogin = await Admin.findOne({ email: email });
//     if (AdminLogin) {
//       const isValid = await bcrypt.compare(password, AdminLogin.password);
//       if (!isValid) {
//         res.status(200).send({ ok: false, message: "Incorrect Credentials" });
//       } else {
//         const token = jwt.sign(
//           {
//             _id: AdminLogin._id,
//             name: AdminLogin.name,
//           },
//           process.env.JWT_PRIVATE_KEY,
//           {
//             expiresIn: "1400000000m",
//           }
//         );
//         return res
//           .status(200)
//           .send({ ok: true, message: "Login Successfull!", token, AdminLogin });
//       }
//     } else {
//       res.status(200).send({ ok: false, message: "User does not exist" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// const jwtVerify = async (req, res) => {
//   console.log(req.headers);
//   const token = req.headers.authorization;
//   console.log(token);
//   if (!token) {
//     return res.send(null);
//   }
// };

// module.exports = {
//   signup,
//   login,
//   getAllTeachers,
//   getAllRequests,
//   verifyTeacher,
//   declineRequest,
//   removeTeacher,
//   addCourse,
//   updateCourse,
//   deleteCourse,
//   allCourses,
//   updateTeacherDetails,
// };
