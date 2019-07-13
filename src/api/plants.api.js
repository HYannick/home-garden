import axios from 'axios';
import localForage from 'localforage';

export const PlantsAPI = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 10000,
});

export const userStore = localForage.createInstance({
  name: 'User'
});

export const plantStore = localForage.createInstance({
  name: 'Plant'
});

