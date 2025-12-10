import axios from "axios";

export const publicAPI= axios.create({
  baseURL: 'https://tarmeezacademy.com/api/v1'
});


// إضافة Token ديناميكي
publicAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

