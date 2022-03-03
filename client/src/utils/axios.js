import axios from "axios";
const dotenv = require("dotenv");
dotenv.config({ path: "../../../server/config.env" });

const axiosInstance = axios.create({
  baseURL: `http://localhost:${process.env.PORT}`,
});

export default axiosInstance;
