import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../../config.env" });
const port = process.env.PORT || 5000;
const axiosInstance = axios.create({
  baseURL: `http://localhost:${port}`,
});

export default axiosInstance;
