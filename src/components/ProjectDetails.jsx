import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUsers,
  FaSave,
  FaTrash,
  FaPlus,
  FaToggleOn,
  FaToggleOff,
  FaClipboardList,
} from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getAllProjects,
  updateProject,
  assignEmployeeToProject,
  removeEmployeeFromProject,
} from "../services/ProjectService";
import { adminListOfEmployees } from "../services/EmployeeService";

const ProjectDetails = () => {
  const { projectCode } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [newMember, setNewMember] = useState({
    employeeId: "",
    role: "",
  });

  useEffect(() => {
    getAllProjects().then((res) => {
      const found = res.data.find((p) => p.projectCode === projectCode);
      if (!found) {
        toast.error("Project not found");
        navigate("/admin-dashboard");
      }
      setProject(found);
    });

    adminListOfEmployees().then((res) => setEmployees(res.data || []));
  }, [projectCode]);

  if (!project) return <p style={{ padding: 30 }}>Loading...</p>;

  const saveProject = () => {
    updateProject(project)
      .then(() => toast.success("Project updated"))
      .catch(() => toast.error("Update failed"));
  };

  const assignMember = () => {
    if (!newMember.employeeId || !newMember.role) {
      toast.error("Select employee & role");
      return;
    }

    assignEmployeeToProject({
      projectCode: project.projectCode,
      employeeId: newMember.employeeId,
      role: newMember.role,
    })
      .then(() => {
        toast.success("Member assigned");
        window.location.reload();
      })
      .catch((err) => toast.error(err.response?.data || "Assignment failed"));
  };

  const removeMember = (assignmentId) => {
    if (!window.confirm("Remove this member from project?")) return;

    removeEmployeeFromProject(assignmentId)
      .then(() => {
        toast.success("Member removed");
        window.location.reload();
      })
      .catch(() => toast.error("Failed to remove"));
  };

  return (
    <div className="project-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="details-card">
        {/* ===== HEADER ===== */}
        <div className="header-row">
          <span className="code-badge">
            <FaClipboardList /> {project.projectCode}
          </span>

          <span
            className={`status-badge ${
              project.status === "ACTIVE" ? "active" : "completed"
            }`}>
            {project.status}
          </span>
        </div>

        {/* ===== NAME ===== */}
        <input
          className="title-input"
          value={project.projectName}
          onChange={(e) =>
            setProject({ ...project, projectName: e.target.value })
          }
        />

        {/* ===== DESCRIPTION ===== */}
        <textarea
          className="desc-input"
          rows="3"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />

        {/* ===== STATUS CONTROL ===== */}
        <div className="status-control">
          <strong>Status</strong>
          <button
            className="toggle-btn"
            onClick={() =>
              setProject({
                ...project,
                status: project.status === "ACTIVE" ? "COMPLETED" : "ACTIVE",
              })
            }>
            {project.status === "ACTIVE" ? (
              <>
                <FaToggleOff /> Deactivate
              </>
            ) : (
              <>
                <FaToggleOn /> Activate
              </>
            )}
          </button>
        </div>

        {/* ===== MEMBERS ===== */}
        <h4 className="section-title">
          <FaUsers /> Members
        </h4>

        <div className="member-list">
          {project.members.map((m) => (
            <div
              key={`${m.employeeId}-${m.memberRole}`}
              className="member-card">
              <span className="member-id">{m.employeeId}</span>
              <span className="member-role">{m.memberRole}</span>
              <FaTrash
                className="remove"
                onClick={() => removeMember(m.assignmentId)}
              />
            </div>
          ))}
        </div>

        {/* ===== ASSIGN ===== */}
        <div className="assign-box">
          <select
            onChange={(e) =>
              setNewMember({ ...newMember, employeeId: e.target.value })
            }>
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.employeeId} value={e.employeeId}>
                {e.employeeId} — {e.firstName}
              </option>
            ))}
          </select>

          <select
            onChange={(e) =>
              setNewMember({ ...newMember, role: e.target.value })
            }>
            <option value="">Role</option>
            <option>FRONTEND</option>
            <option>BACKEND</option>
            <option>QA</option>
            <option>DEVOPS</option>
          </select>

          <button onClick={assignMember}>
            <FaPlus /> Assign
          </button>
        </div>

        {/* ===== SAVE ===== */}
        <button className="save-btn" onClick={saveProject}>
          <FaSave /> Save Changes
        </button>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        .project-details-page {
          background:#f6e0c2;
          min-height:100vh;
          padding:30px;
        }

        .back-btn {
          background:none;
          border:none;
          font-weight:700;
          margin-bottom:15px;
          cursor:pointer;
        }

        .details-card {
          background:linear-gradient(145deg,#0f0f0f,#181818);
          color:#fff;
          padding:30px;
          border-radius:22px;
          max-width:800px;
          box-shadow:0 20px 50px rgba(0,0,0,0.45);
        }

        .header-row {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:16px;
        }

        .code-badge {
          display:flex;
          gap:6px;
          align-items:center;
          background:#1f2937;
          color:#f2c38b;
          padding:6px 12px;
          border-radius:999px;
          font-size:0.75rem;
          font-weight:700;
        }

        .status-badge {
          padding:6px 12px;
          border-radius:999px;
          font-size:0.75rem;
          font-weight:700;
        }

        .status-badge.active {
          background:#dcfce7;
          color:#166534;
        }

        .status-badge.completed {
          background:#fee2e2;
          color:#991b1b;
        }

        .title-input {
          font-size:1.4rem;
          font-weight:800;
          margin-bottom:10px;
        }

        input, textarea, select {
          width:100%;
          padding:12px;
          background:#111827;
          color:#fff;
          border-radius:12px;
          border:1px solid #1f2937;
          margin-bottom:12px;
        }

        .status-control {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin:16px 0;
        }

        .toggle-btn {
          background:#f2c38b;
          border:none;
          border-radius:10px;
          padding:8px 14px;
          font-weight:800;
          cursor:pointer;
        }

        .section-title {
          margin-top:20px;
          margin-bottom:10px;
          color:#f2c38b;
        }

        .member-list {
          display:grid;
          gap:8px;
        }

        .member-card {
          display:flex;
          justify-content:space-between;
          align-items:center;
          background:#111827;
          padding:10px 14px;
          border-radius:12px;
        }

        .member-id {
          font-weight:700;
          color:#f2c38b;
        }

        .member-role {
          background:#020617;
          padding:4px 10px;
          border-radius:999px;
          font-size:0.7rem;
        }

        .remove {
          cursor:pointer;
          color:#ef4444;
        }

        .assign-box {
          display:flex;
          gap:10px;
          margin-top:16px;
        }

        .assign-box button {
          background:#f2c38b;
          border:none;
          border-radius:12px;
          font-weight:800;
          padding:12px 16px;
        }

        .save-btn {
          width:100%;
          margin-top:20px;
          padding:14px;
          background:#f2c38b;
          border:none;
          border-radius:14px;
          font-weight:900;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
