// api.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-11-9tn7.onrender.com/', // Replace with your actual base URL
});

export default instance;
