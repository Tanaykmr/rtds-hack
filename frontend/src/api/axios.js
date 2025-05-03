import axiosDefault from "axios";

const isProduction = process.env.NODE_ENV === "production";

// For Create React App, environment variables must be prefixed with REACT_APP_
// Make sure your .env.development file:
// 1. Is in the root of your frontend directory (same level as package.json)
// 2. Contains REACT_APP_SERVER_PORT=your_port (exact naming)
// 3. You've restarted your development server after creating/modifying the file
console.log("Environment:", process.env.NODE_ENV);
console.log("Server port:", process.env.REACT_APP_SERVER_PORT);

const baseURL = isProduction
  ? "https://<your-production-domain>/api"
  // : "http://localhost:4000";
  : `http://devops001.theacecloud.co:${process.env.REACT_APP_SERVER_PORT || 3001}`;

const defaultOptions = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axios = axiosDefault.create(defaultOptions);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token || "";
  return config;
});

export default axios;
