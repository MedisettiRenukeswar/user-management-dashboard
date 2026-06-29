import axios from "axios";

// Base API instance pointing to JSONPlaceholder
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
});

export const fetchUsers = () => api.get("/users");
export const createUser = (userData) => api.post("/users", userData);
export const editUser = (id, userData) => api.put(`/users/${id}`, userData);
export const removeUser = (id) => api.delete(`/users/${id}`);
