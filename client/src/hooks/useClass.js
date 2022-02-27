import axios from "../utils/axios";
const giveFeedback = async (formData, navigate) => {
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
  } catch (e) {
    console.log(e);
  }
};


export const getAllClasses = async (teacherID) => {
  const res = await axios.get(`/teacher/getAllClasses/${teacherID}`);
  console.log(res,"teacher classes!");
  if(res.data.ok){
    console.log(res.data.getClasses.classes);
    return res.data.getClasses.classes;
  };
  return [];
}


export const getClass = async (classId) => {
  const res = await axios.get(`/teacher/getOneClass/${classId}`);
  console.log(res,"class id response");
  if(res.data.ok){
    return res.data.getClass;
  }
  return null;
}

export const createClass = async (data,navigate) => {
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try{
    const res = await axios.post('/teacher/createClass',body,config);
    console.log(res,"create class response");
    if(res.data.ok){
      navigate(`/teacher/class/${res.data.saveClass._id}`);
      console.log(res.data,"wekjnfkw");
    }
  }catch(err){
    console.log(err);
  }
}

export const addSubject = async (data) =>{
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try{
    const res = await axios.post('/teacher/addSubject',body,config);
    console.log(res,"Add subject response");
  }catch(err){
    console.log(err);
  }
}


export const addTest = async (data) =>{
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try{
    const res = await axios.post('/teacher/addTest',body,config);
    console.log(res,"Add test response");
  }catch(err){
    console.log(err);
  }
}


export const getTest = async (testId) => {
  const res = await axios.get(`/teacher/getOneTest/${testId}`);
  console.log(res,"class test response");
  if(res.data.ok){
    console.log(res.data)
  }
  return null;
}

export const setStudentMarks = async (data) => {
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };


  try{
    const res = await axios.post('/teacher/setMarks',body,config);
    console.log(res,"student set marks response");
  }catch(err){
    console.log(err);
  }
}


export const addAnnouncement = async (data) =>{
  const body = JSON.stringify(data);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try{
    const res = await axios.post('/teacher/addAnnouncement',body,config);
    console.log(res,"announcement response");

  }catch(err){
    console.log(err);
  }
}

export const getAllAnnouncements = async (classId) => {
  const res = await axios.get(`/teacher/getAllAnnouncements/${classId}`);
  console.log(res,"get announcement response");

  if(res.data.ok){
    return res.data.announcements;
  }
}



export default giveFeedback;
