import axios from "../utils/axios";
// import axios from 'axios';

import {
  initialize,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../redux/slices/auth";
import setToken from "../utils/setToken";
export const SignupHandler = async (formData, dispatch, navigate) => {
  try {
    const body = JSON.stringify(formData);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.post("/user/signup", body, config);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (e) {
    return e;
  }
};

export const LoginHandler = async (formData, dispatch, isAdmin) => {
  const body = JSON.stringify(formData);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (isAdmin) {
    var res = await axios.post("/admin/login", body, config);
  } else {
    var res = await axios.post("/user/login", body, config);
  }
  let userToken = "";
  let adminToken = "";
  if (res.data.ok) {
    if (isAdmin) {
      adminToken = res.data.token;
      var user = res.data.AdminLogin;
      localStorage.setItem("adminToken", JSON.stringify(adminToken));
    } else {
      userToken = res.data.token;
      var user = res.data.userLogin;
      localStorage.setItem("userToken", JSON.stringify(userToken));
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
    localStorage.getItem("userToken") || localStorage.getItem("adminToken");
  if (token) {
    setToken(token);
    if (localStorage.getItem("userToken")) {
      const res = await axios.get("/user/jwtVerify");
      console.log("fomr fskfj");
      console.log(res);
      dispatch(
        initialize({
          isLoggedIn: true,
          user: res.data.user,
        })
      );
    } else if (localStorage.getItem("adminToken")) {
      const res = await axios.get("/admin/jwtVerify");
      console.log(res);
      dispatch(
        initialize({
          isLoggedIn: true,
          user: res.data.user,
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
  if (localStorage.getItem("userToken")) {
    localStorage.removeItem("userToken");
  } else {
    localStorage.removeItem("adminToken");
  }
  dispatch(logoutSuccess());
};
