import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const registerUser = (user) =>
  axios.post(`${BASE_URL}/register`, user);

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/login`, data);

export const adminLogin = (data) =>
  axios.post(`${BASE_URL}/adminLogin`, data);
