import axios from "axios";

const defaultHost = `${location.protocol}//${location.hostname}:8000`;
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultHost,
});

export default API;