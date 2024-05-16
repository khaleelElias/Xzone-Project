import { API_URL } from "@/config";
import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: `${API_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
