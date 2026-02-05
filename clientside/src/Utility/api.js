import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3400",
  withCredentials: true,
});

export default api;
