import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

// Get All
export const listEmployees = () => axios.get(REST_API_BASE_URL);

// Create
export const createEmployee = (employee) =>
  axios.post(REST_API_BASE_URL, employee);

// Get Employee By ID (for Edit)
export const getEmployeeById = (id) =>
  axios.get(`${REST_API_BASE_URL}/${id}`);

// Update Employee
export const updateEmployee = (id, employee) =>
  axios.post(`${REST_API_BASE_URL}/${id}`, employee);

export const deleteEmployeeById = (id) =>
      axios.delete(`${REST_API_BASE_URL}/${id}`);

