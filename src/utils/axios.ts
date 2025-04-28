import axios from 'axios';
const url='https://bpanetapi.vercel.app'//http://localhost:5000
const api = axios.create({
  baseURL: url, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
