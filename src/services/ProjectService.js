import axios from "axios";

const PROJECT_BASE_URL = "http://localhost:8080/api/admin/project";
const BASE_URL = "http://localhost:8080/api/employees";

/* ================= CREATE PROJECT ================= */
export const createProjects = (project) => {
  return axios.post(`${PROJECT_BASE_URL}/createProject`, project);
};

/* ================= GET ALL PROJECTS ================= */
export const getAllProjects = () => {
  return axios.get(`${PROJECT_BASE_URL}/all`);
};

/* ================= PROJECT STATS ================= */
export const getProjectStats = () => {
  return axios.get(`${PROJECT_BASE_URL}/stats`);
};


/* ================= PROJECT STATUS ================= */

export const updateProjectStatus = (projectCode, status) =>
  axios.put(
    `${PROJECT_BASE_URL}/update-status?projectCode=${projectCode}&status=${status}`
  );

/* ================= PROJECT UPDATE ================= */


export const updateProject = (project) =>
  axios.put(`${PROJECT_BASE_URL}/update`, project);

/* ================= PROJECT ASSIGN EMPLOYEE TO PROJECT ================= */

export const assignEmployeeToProject = (data) =>
  axios.post(`${PROJECT_BASE_URL}/assign`, data);

/* ================= PROJECT DE-ASSIGN EMPLOYEE TO PROJECT ================= */

export const removeEmployeeFromProject = (assignmentId) =>
  axios.delete(`${PROJECT_BASE_URL}/deassign`, {
    params: { assignmentId },
  });

/* ================= USER PROJECTS ================= */
export const getUserProjects = (employeeId) =>
  axios.get(`${BASE_URL}/${employeeId}/projects`);