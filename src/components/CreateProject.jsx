import React, { useEffect, useState } from "react";
import {
  FaProjectDiagram,
  FaFileAlt,
  FaSave,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createProjects } from "../services/ProjectService";
import { adminListOfEmployees } from "../services/EmployeeService";
import { addAdminNotification } from "./adminNotifications";

const CreateProject = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [project, setProject] = useState({
    projectName: "",
    description: "",
    status: "ACTIVE",
    members: [],
  });

  /* ================= LOAD ELIGIBLE EMPLOYEES ================= */
  useEffect(() => {
    adminListOfEmployees()
      .then((res) => {
        const allEmployees = res.data || [];

        const eligible = allEmployees.filter((emp) => {
          if (!emp.projectAssignments || emp.projectAssignments.length === 0) {
            return true;
          }

          const hasActiveProject = emp.projectAssignments.some(
            (pa) => pa.project?.status === "ACTIVE"
          );

          return !hasActiveProject;
        });

        setEmployees(eligible);
      })
      .catch(() => toast.error("Failed to load employees"));
  }, []);

  /* ================= INPUT HANDLERS ================= */
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  /* ================= ADD MEMBER ================= */
  const addMember = () => {
    if (project.members.length >= 4) {
      toast.error("Only 4 members allowed per project");
      return;
    }

    setProject({
      ...project,
      members: [...project.members, { employeeId: "", memberRole: "" }],
    });
  };

  /* ================= UPDATE MEMBER ================= */
  const updateMember = (index, field, value) => {
    if (field === "employeeId") {
      const alreadySelected = project.members.some(
        (m, i) => m.employeeId === value && i !== index
      );

      if (alreadySelected) {
        toast.error("Employee already selected in this project");
        return;
      }
    }

    const updated = [...project.members];
    updated[index][field] = value;
    setProject({ ...project, members: updated });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!project.projectName || !project.description) {
      toast.error("All fields are required");
      return;
    }

    if (project.members.length === 0) {
      toast.error("Assign at least one employee");
      return;
    }

    toast
      .promise(createProjects(project), {
        loading: "Creating project...",
        success: "Project created & assigned successfully 🚀",
        error: "Failed to create project ❌",
      })
      .then(() => {
        addAdminNotification(
          `📌 Project "${project.projectName}" created & assigned to ${project.members.length} employee(s)`
        );
        setTimeout(() => navigate("/admin-dashboard"), 1200);
      });
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="project-page">
        <form className="project-card" onSubmit={handleSubmit}>
          {/* 🔙 BACK BUTTON */}
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/admin-dashboard")}>
            <FaArrowLeft /> Back to Dashboard
          </button>

          <h2>📁 Create New Project</h2>

          {/* PROJECT NAME */}
          <div className="field">
            <label>Project Name</label>
            <div className="input-box">
              <FaProjectDiagram />
              <input
                type="text"
                name="projectName"
                value={project.projectName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="field">
            <label>Description</label>
            <div className="input-box textarea">
              <FaFileAlt />
              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
          </div>

          {/* STATUS */}
          <div className="field">
            <label>Status</label>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="select-box">
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          {/* MEMBERS */}
          <div className="field">
            <label>
              <FaUsers /> Assign Members (Max 4)
            </label>

            <p style={{ fontSize: "0.75rem", color: "#bbb", marginBottom: 6 }}>
              ℹ️ Employees already working on active projects are hidden
            </p>

            {project.members.map((m, index) => (
              <div key={index} className="member-row">
                <select
                  className="select-box"
                  value={m.employeeId}
                  onChange={(e) =>
                    updateMember(index, "employeeId", e.target.value)
                  }
                  required>
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.employeeId} value={emp.employeeId}>
                      {emp.employeeId} - {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>

                <select
                  className="select-box"
                  value={m.memberRole}
                  onChange={(e) =>
                    updateMember(index, "memberRole", e.target.value)
                  }
                  required>
                  <option value="">Role</option>
                  <option value="FRONTEND">Frontend</option>
                  <option value="BACKEND">Backend</option>
                  <option value="QA">QA</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="DEVOPS">Deployment</option>
                </select>
              </div>
            ))}

            <button
              type="button"
              className="add-member-btn"
              onClick={addMember}>
              + Add Member
            </button>
          </div>

          <button className="create-btn">
            <FaSave /> Create Project
          </button>
        </form>
      </div>

      {/* ================= CSS (UNCHANGED + BACK BUTTON) ================= */}
      <style>{`
        .project-page {
          min-height: 100vh;
          background: #f6e0c2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .project-card {
          width: 480px;
          background: #0f0f0f;
          color: #fff;
          padding: 40px;
          border-radius: 22px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .back-btn {
          background: transparent;
          border: none;
          color: #f2c38b;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          margin-bottom: 15px;
        }

        h2 {
          text-align: center;
          color: #f2c38b;
          margin-bottom: 30px;
        }

        .field { margin-bottom: 20px; }

        label {
          font-size: 14px;
          color: #bbb;
          margin-bottom: 6px;
          display: block;
        }

        .input-box {
          display: flex;
          gap: 10px;
          border-bottom: 1px solid #444;
          padding-bottom: 6px;
        }

        input, textarea {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          width: 100%;
        }

        .select-box {
          width: 100%;
          padding: 10px;
          background: #1f1f1f;
          border: 1px solid #333;
          border-radius: 10px;
          color: #fff;
          margin-bottom: 8px;
        }

        .member-row {
          display: flex;
          gap: 10px;
          margin-bottom: 8px;
        }

        .add-member-btn {
          background: transparent;
          border: 1px dashed #f2c38b;
          color: #f2c38b;
          padding: 8px;
          width: 100%;
          border-radius: 10px;
          margin-top: 8px;
          cursor: pointer;
        }

        .create-btn {
          margin-top: 25px;
          width: 100%;
          background: #f2c38b;
          color: #000;
          border: none;
          padding: 14px;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default CreateProject;
