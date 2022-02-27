import axios from "../utils/axios";
// const dotenv = require("dotenv").config({ path: "../../.env" });
// const accountSid = process.env.accountSid;
// const authToken = process.env.authToken;
// const client = require("twilio")(accountSid, authToken, {
//   lazyLoading: true,
// });

const giveFeedback = async (formData, navigate, enqueueSnackbar) => {
  const body = JSON.stringify(formData);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post("/student/feedback", body, config);
    console.log(res);
    navigate("/student/recentTests");

    enqueueSnackbar("Feedback Sent!", {
      variant: "success",
    });
  } catch (e) {
    console.log(e);
    enqueueSnackbar("Some Error Occurred!", {
      variant: "error",
    });
  }
};

export const getAllClasses = async (teacherID) => {
  const res = await axios.get(`/teacher/getAllClasses/${teacherID}`);
  console.log(res, "teacher classes!");
  if (res.data.ok) {
    console.log(res.data.getClasses.classes);
    return res.data.getClasses.classes;
  }
  return [];
};

export const getClass = async (classId) => {
  const res = await axios.get(`/teacher/getOneClass/${classId}`);
  console.log(res, "class id response");
  if (res.data.ok) {
    return res.data.getClass;
  }
  return null;
};

export const createClass = async (data, navigate, enqueueSnackbar) => {
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post("/teacher/createClass", body, config);
    console.log(res, "create class response");
    if (res.data.ok) {
      navigate(`/teacher/class/${res.data.saveClass._id}`);
      console.log(res.data, "wekjnfkw");
      enqueueSnackbar("Class created!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Some error occurred!", {
        variant: "error",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addSubject = async (data, enqueueSnackbar) => {
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post("/teacher/addSubject", body, config);
    console.log(res, "Add subject response");
    enqueueSnackbar("Subject added to class!", {
      variant: "success",
    });
  } catch (err) {
    console.log(err);
    enqueueSnackbar("Some error occurred!", {
      variant: "error",
    });
  }
};

export const addTest = async (data,navigate, enqueueSnackbar) => {
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post("/teacher/addTest", body, config);
    console.log(res, "Add test response");
    enqueueSnackbar("Test added successfully!", {
      variant: "success",
    });
    navigate(`/teacher/class/${data.classID}/test/${res.data.saveTest._id}`)
  } catch (err) {
    enqueueSnackbar("Some error occurred!", {
      variant: "error",
    });
    console.log(err);
  }
};

export const getTest = async (testId) => {
  const res = await axios.get(`/teacher/getOneTest/${testId}`);
  console.log(res,"class test response");
  if(res.data.ok){
    return res.data.test;
  }
  return null;
};


export const setStudentMarks = async (data,enqueueSnackbar) => {

  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try{
    const res = await axios.post('/teacher/setMarks',body,config);
    if(res.data.ok){
      enqueueSnackbar("Marks saved ",{variant:"success"})
    }
    console.log(res,"student set marks response");
  }catch(err){
    console.log(err);
  }
};

export const getAllTests = async (studentId) => {
  const res = await axios.get(`/student/getAllTests/${studentId}`);
  console.log(res,"all test response");
  if(res.data.ok){
    console.log(res.data);
    return res.data.allTests;
  }
}

export const markAttendance = async (formData, navigate, enqueueSnackbar) => {
  try {
    const body = JSON.stringify(formData);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.post("teacher/markAttendance", body, config);
    console.log(res);
    if (res.data.ok) {
      navigate("/teacher/classes");

      enqueueSnackbar("Attendance Marked!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Some error occurred!", {
        variant: "error",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const addAnnouncement = async (data, enqueueSnackbar) => {
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.post("/teacher/addAnnouncement", body, config);
    console.log(res, "announcement response");
    enqueueSnackbar("Announcement created!", {
      variant: "success",
    });
  } catch (err) {
    enqueueSnackbar("Some error occurred!", {
      variant: "error",
    });
    console.log(err);
  }
};

export const getAllAnnouncements = async (classId) => {
  const res = await axios.get(`/teacher/getAllAnnouncements/${classId}`);
  console.log(res, "get announcement response");

  if (res.data.ok) {
    return res.data.announcements;
  }
};

export const getAttendance = async (student_id) => {
  const res = await axios.get(`/student/getAttendance/${student_id}`);
  if (res.data.ok) {
    return res.data.attendance;
  } else {
  }
};

export default giveFeedback;
