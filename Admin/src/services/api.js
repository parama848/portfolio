import axios from "axios";

const API = axios.create({
  baseURL: "https://portfolio-paranthaman-zuzs.onrender.com",
});

export default API;