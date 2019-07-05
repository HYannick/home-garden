import axios from 'axios';

const PlantsAPI = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 1000,
});

export default PlantsAPI;
