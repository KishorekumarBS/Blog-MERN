import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blog-mern-z9vc.onrender.com',
  withCredentials: true
});

export default api;