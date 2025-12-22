import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employees";

const ADMIN_BASE_URL = "http://localhost:8080/api/admin";

// ✅ Get all employees (ADMIN)
export const adminListOfEmployees = () => {
  return axios.get(`${ADMIN_BASE_URL}/list-employees`);
};

// ✅ Delete employee by ID (ADMIN)
export const adminDeleteEmployeeById = (id) => {
  return axios.delete(`${ADMIN_BASE_URL}/delete-employee/${id}`);
};

// EmployeeService.js
export const getEmployeeCount = () =>
  axios.get("http://localhost:8080/api/admin/employees/count");

// ADMIN Update Employee By Id

export const adminUpdateEmployee = (id, employee) =>
  axios.put(`${ADMIN_BASE_URL}/${id}/update-Employee`, employee);

// ADMIN Change Password

export const adminChangePassword = (id, data) =>
  axios.put(`${ADMIN_BASE_URL}/${id}/admin-change-password`, data);

// ADMIN Update Profile

export const updateAdminProfile = (id, employee) =>
  axios.put(`${ADMIN_BASE_URL}/${id}/update-admin`, employee);




/* ================================================================================================================================ */

// All employees
export const listEmployees = () => axios.get(BASE_URL);

// Create employee
export const createEmployee = (employee) =>
  axios.post(BASE_URL, employee);

// Get employee by numeric ID
export const getEmployeeById = (id) =>
  axios.get(`${BASE_URL}/id/${id}`);

// Get employee by employeeId (EMSxxxxx)
export const getEmployeeByEmployeeId = (employeeId) =>
  axios.get(`${BASE_URL}/empid/${employeeId}`);

// Update employee
export const updateEmployee = (id, employee) =>
  axios.put(`${BASE_URL}/${id}`, employee);

// Delete employee
export const deleteEmployeeById = (id) =>
  axios.delete(`${BASE_URL}/id/${id}`);

// Punch In
export const punchIn = (id) =>
  axios.put(`${BASE_URL}/${id}/punch-in`);

// Punch Out
export const punchOut = (id) =>
  axios.put(`${BASE_URL}/${id}/punch-out`);

// 🔐 Change Password API
export const changePassword = (id, data) =>
  axios.put(`${BASE_URL}/${id}/change-password`, data);

