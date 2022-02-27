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
    console.log(res,"Add subject response");
  }catch(err){
    console.log(err);
  }
}


export default giveFeedback;
