// services/api.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000", // Your backend URL
});

export default apiClient;
