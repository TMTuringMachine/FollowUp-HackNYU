const User = require("../models/UserSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto module is node supported");
}

const signup = async (req, res) => {
  var { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword)
    res.status(422).send("Enter all fields");
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).send("User with this email already exists");
    } else if (password !== cpassword) {
      res.status(422).send("Passwords do not match");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      const user = new User({ name, email, phone, password });
      const saveUser = await user.save();
      if (saveUser) res.status(200).send("User created successfully");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(200)
        .send({ ok: false, message: "Email or password cannot be blank" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isValid = await bcrypt.compare(password, userLogin.password);
      if (!isValid) {
        res.status(200).json({ ok: false, message: "Incorrect Credentials" });
      } else {
        const token = jwt.sign(
          {
            _id: userLogin._id,
            name: userLogin.name,
          },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "14000000m",
          }
        );
        return res
          .status(200)
          .json({ ok: true, message: "Login Successfull!", token, userLogin });
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
    const user = await User.findById(decodeToken._id).populate(
      "myEnrolledCourses.courseID"
    );
    return res.send({ user });
  }
  res.send(null);
};

const uploadData = async (req, res) => {
  const { education, DateOfBirth, age, gender, address, image } = req.body;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { education, DateOfBirth, age, gender, address, image, hasProfile: true }
  );
  res.status(200).send(user);
};

const updateUserProgress = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const user = await User.findOne({ email: req.user.email }).populate(
    "myEnrolledCourses.courseID"
  );

  console.log(user.enrolledCourses.find((i) => i._id === id));

  res.send(200).send("test");
};

const uploadTeacherData = async (req, res) => {
  const { domain, idProof } = req.body;
  const data = await User.findOneAndUpdate(
    { email: req.user.email },
    { domain, idProof, isPending: true }
  );
  res.status(200).send("Teacher Data Uploaded, wait for admin approval");
};

const buyCourse = async (req, res) => {
  const { amount } = req.body;
  let options = {
    amount,
    currency: "INR",
    receipt: "order_receipt_0.1",
  };
  try {
    const razorRes = await Razor.orders.create(options);
    // console.log("razorRes:");
    // console.log(razorRes);
    return res.status(200).json({ ok: true, razorRes });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ ok: false, error });
  }
};

const razorCallback = (req, res) => {
  const webhookSecret = process.env.WEBHOOK_SECRET || "";
  // console.log(`webhook secret: ${webhookSecret}`);
  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  // console.log("req body");
  // console.log(req.body);

  // console.log(digest, req.body.payload);
  let razorSignature = req.headers["x-razorpay-signature"];
  if (razorSignature && digest === razorSignature) {
    // console.log("request is legit");
    // process it
    // console.log(req.body);
    // require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))

    // return res.status(200).json({ok: true, data: req.body});

    return res.status(200).json({ ok: true, data: req.body });
    // return res.status(200).json({ok: true});
  } else {
    // pass it
    // console.log("digest: ");
    // console.log(digest);
    // console.log("req.headers[dksjfh]: ");
    // console.log(req.headers["x-razorpay-signature"]);
    return res.status(200).json({ ok: false });
  }
};

const verifyPayments = async (req, res) => {
  console.log("i get hit");
  const razor_secret = process.env.WEBHOOK_SECRET;
  const { user_id, course_id, payment_id, order_id, razor_signature } =
    req.body;
  console.log(req.body);
  const razor_ids = `${order_id} | ${payment_id}`;
  try {
    const generatedSignature = crypto
      .createHmac("sha256", razor_secret)
      .update(razor_ids.toString())
      .digest("hex");

    console.log(
      `generatedSignature: ${generatedSignature}, razor_signature: ${razor_signature}`
    );
    console.log(`Are they the same? ${generatedSignature === razor_signature}`);
    if (true) {
      console.log("here");
      let currentUser = await User.findById(user_id);
      let enrolledCourse = {
        courseID: course_id,
        order_id,
        payment_id,
        payment_signature: razor_signature,
      };
      currentUser?.myEnrolledCourses.push(enrolledCourse);
      await currentUser.save();
      const updatedUser = await User.findByIdAndUpdate(user_id, currentUser, {
        new: true,
      });
      // return res.redirect("/dashboard");
      console.log(JSON.stringify(updatedUser));
      return res.status(200).json({ ok: true, updatedUser: updatedUser });
    }
    // throw new Error("not valid");
  } catch (error) {
    console.log(error);
    return res.redirect("/login");
  }
};

const myTeachings = async (req, res) => {
  const id = req.user._id;
  try {
    let courses = await Course.find({ teacherId: id });
    return res.status(200).json({ ok: true, courses });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  signup,
  login,
  jwtVerify,
  uploadData,
  uploadTeacherData,
  buyCourse,
  razorCallback,
  verifyPayments,
  myTeachings,
  updateUserProgress,
};
