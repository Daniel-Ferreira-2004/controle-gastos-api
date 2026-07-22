import axios from "axios";

// URL base da API backend (ControleGastosAPI).
const api = axios.create({
  baseURL: "https://localhost:7105/api",
});

export default api;