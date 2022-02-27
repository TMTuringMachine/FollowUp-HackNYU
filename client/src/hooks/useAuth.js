import axios from "../utils/axios";
// import axios from 'axios';

import {
  initialize,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../redux/slices/auth";
import setToken from "../utils/setToken";
export const SignupHandler = async (
  formData,
  dispatch,
  navigate,
  isTeacher
) => {
  try {
    const body = JSON.stringify(formData);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (isTeacher) {
      await axios.post("/teacher/signup", body, config);
      dispatch(registerSuccess());
      navigate("/teacher/login");
    } else {
      await axios.post("/student/signup", body, config);
      dispatch(registerSuccess());

      navigate("/student/login");
    }
  } catch (e) {
    return e;
  }
};

export const LoginHandler = async (formData, dispatch, isTeacher) => {
  const body = JSON.stringify(formData);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (isTeacher) {
    var res = await axios.post("/teacher/login", body, config);
  } else {
    var res = await axios.post("/student/login", body, config);
  }
  let studentToken = "";
  let teacherToken = "";
  if (res.data.ok) {
    if (isTeacher) {
      teacherToken = res.data.token;
      var user = res.data.teacherLogin;
      localStorage.setItem("teacherToken", teacherToken);
      setToken(teacherToken);
    } else {
      studentToken = res.data.token;
      var user = res.data.studentLogin;
      localStorage.setItem("studentToken", studentToken);
      setToken(studentToken);
    }
    console.log(user);
    dispatch(loginSuccess(user));
    const obj = {
      dataMessage: res?.data?.message,
      error: undefined,
    };
    return obj;
  } else {
    const obj = {
      dataMessage: undefined,
      error: res?.data?.message,
    };
    return obj;
  }
};
export const initializeUser = async (dispatch) => {
  const token =
    localStorage.getItem("studentToken") ||
    localStorage.getItem("teacherToken");
  if (token) {
    setToken(token);
    if (localStorage.getItem("studentToken")) {
      const res = await axios.get("/student/jwtVerify");
      console.log(res);
      dispatch(
        initialize({
          isLoggedIn: true,
          user: res.data.student,
        })
      );
    } else if (localStorage.getItem("teacherToken")) {
      const res = await axios.get("/teacher/jwtVerify");
      console.log(res);
      dispatch(
        initialize({
          isLoggedIn: true,
          user: res.data.teacher,
        })
      );
    } else {
      dispatch(
        initialize({
          isLoggedIn: false,
          user: null,
        })
      );
    }
  } else {
    dispatch(
      initialize({
        isLoggedIn: false,
        user: null,
      })
    );
  }
};

export const logout = (dispatch) => {
  if (localStorage.getItem("studentToken")) {
    localStorage.removeItem("studentToken");
  } else {
    localStorage.removeItem("teacherToken");
  }
  dispatch(logoutSuccess());
};
