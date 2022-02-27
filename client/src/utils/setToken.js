import axios from "./axios";

const setToken = (accessToken) => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization =   accessToken
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
export default setToken;
