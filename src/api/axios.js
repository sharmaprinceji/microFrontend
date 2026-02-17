import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:5001",

  headers: {
    "Content-Type": "application/json"
  }

});


// REQUEST INTERCEPTOR
API.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    } else {

      delete config.headers.Authorization;
    }

    return config;
  },

  (error) => Promise.reject(error)

);


// RESPONSE INTERCEPTOR (optional but recommended)
API.interceptors.response.use(

  (response) => response,

  (error) => {

    // auto logout if token invalid
    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }

);

export default API;
