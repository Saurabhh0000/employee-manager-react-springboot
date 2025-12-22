import React, { useEffect, useState } from "react";
import {
  getEmployeeByEmployeeId,
  punchIn,
  punchOut,
} from "../services/EmployeeService";
import { getUserProjects } from "../services/ProjectService";
import {
  FaClock,
  FaSignInAlt,
  FaSignOutAlt,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UserDashboard = () => {
  const navigate = useNavigate();

  const employeeId = localStorage.getItem("employeeId");

  const [employee, setEmployee] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [loadingIn, setLoadingIn] = useState(false);
  const [loadingOut, setLoadingOut] = useState(false);
  const [hasPunchedIn, setHasPunchedIn] = useState(false);
  const [hasPunchedOut, setHasPunchedOut] = useState(false);

  /* ================= FORMAT DATE ================= */
  const formatDateTime = (value) => {
    if (!value) return "---";
    return new Date(value).toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ================= WORKING HOURS ================= */
  const calculateWorkingHours = (punchIn, punchOut) => {
    if (!punchIn || !punchOut) return "--";
    const diff = new Date(punchOut) - new Date(punchIn);
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    return `${h}h ${m}m`;
  };

  /* ================= LOAD EMPLOYEE ================= */
  const loadEmployee = () => {
    getEmployeeByEmployeeId(employeeId)
      .then((res) => {
        setEmployee(res.data);
        setHasPunchedIn(!!res.data.punchIn);
        setHasPunchedOut(!!res.data.punchOut);
      })
      .catch(() => {
        toast.error("Session expired ❌");
        navigate("/login");
      });
  };

  /* ================= LOAD PROJECTS ================= */
  const loadEmployeeProjects = () => {
    getUserProjects(employeeId)
      .then((res) => {
        setProjects(res.data || []);
      })
      .catch(() => {
        toast.error("Failed to load projects ❌");
      })
      .finally(() => setLoadingProjects(false));
  };

  /* ================= INIT ================= */
  useEffect(() => {
    if (!employeeId) {
      toast("Please login to continue 🔐");
      navigate("/login");
    } else {
      loadEmployee();
      loadEmployeeProjects();
    }
  }, []);

  /* ================= PUNCH IN ================= */
  const handlePunchIn = () => {
    setLoadingIn(true);
    punchIn(employee.id)
      .then(() => {
        toast.success("Punch In successful ✅");
        loadEmployee();
      })
      .finally(() => setLoadingIn(false));
  };

  /* ================= PUNCH OUT ================= */
  const handlePunchOut = () => {
    setLoadingOut(true);
    punchOut(employee.id)
      .then(() => {
        toast.success("Punch Out successful ✅");
        loadEmployee();
      })
      .finally(() => setLoadingOut(false));
  };

  if (!employee) return <h3>Loading dashboard...</h3>;

  return (
    <div className="user-page">
      <Toaster position="top-right" />

      {/* ================= HEADER ================= */}
      <div className="card">
        <h2>
          Welcome, <span>{employee.firstName}</span> 👋
        </h2>
        <p>Track your attendance & projects</p>

        <div className="info-row">
          <span>
            <strong>ID:</strong> {employee.employeeId}
          </span>
          <span>
            <strong>Role:</strong> {employee.role}
          </span>
        </div>
      </div>

      {/* ================= STATUS ================= */}
      <div className="status-grid">
        <StatusCard title="Punch In" value={formatDateTime(employee.punchIn)} />
        <StatusCard
          title="Punch Out"
          value={formatDateTime(employee.punchOut)}
        />
        <StatusCard
          title="Working Hours"
          value={calculateWorkingHours(employee.punchIn, employee.punchOut)}
        />
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="card">
        <h4>
          <FaClock /> Attendance
        </h4>
        <div className="btn-row">
          <button
            disabled={hasPunchedIn || loadingIn}
            onClick={handlePunchIn}
            className="btn primary">
            <FaSignInAlt /> Punch In
          </button>

          <button
            disabled={!hasPunchedIn || hasPunchedOut || loadingOut}
            onClick={handlePunchOut}
            className="btn dark">
            <FaSignOutAlt /> Punch Out
          </button>
        </div>
      </div>

      {/* ================= MY PROJECTS ================= */}
      <div className="card">
        <h4>
          <FaClipboardList /> My Projects
        </h4>

        {loadingProjects ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="muted">No projects assigned</p>
        ) : (
          <div className="project-grid">
            {projects.map((p, i) => (
              <div key={i} className="project-card">
                <div className="project-top">
                  <span
                    className={`badge ${
                      p.status === "ACTIVE" ? "active" : "completed"
                    }`}>
                    {p.status}
                  </span>

                  <span className="project-code-badge">
                    <FaClipboardList />
                    {p.projectCode}
                  </span>
                </div>
                <h5>{p.projectName}</h5>
                <p className="desc">{p.description}</p>
                <p className="role">
                  <FaUsers /> {p.role}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .user-page {
          min-height: 100vh;
          padding: 30px;
          background: linear-gradient(135deg,#eef2ff,#f8fafc);
        }
        .card {
          background:#fff;
          padding:24px;
          border-radius:18px;
          margin-bottom:25px;
          box-shadow:0 10px 30px rgba(0,0,0,0.08);
        }
        .info-row {
          display:flex;
          gap:30px;
          margin-top:10px;
        }
        .status-grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:20px;
          margin:25px 0;
        }
        .btn-row {
          display:flex;
          gap:15px;
        }
        .btn {
          border:none;
          padding:12px 20px;
          border-radius:12px;
          font-weight:700;
          display:flex;
          gap:8px;
          align-items:center;
        }
        .btn.primary { background:#6366f1; color:#fff; }
        .btn.dark { background:#111; color:#fff; }

        .project-grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:18px;
          margin-top:15px;
        }
        .project-card {
          background:#0f172a;
          color:#fff;
          padding:18px;
          border-radius:16px;
        }
        .badge {
          font-size:0.7rem;
          padding:4px 10px;
          border-radius:999px;
        }
          .project-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

/* 🔥 Project code badge (top-right) */
.project-code-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #1f2937;
  color: #f2c38b;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
}
        .badge.active { background:#dcfce7; color:#166534; }
        .badge.completed { background:#fee2e2; color:#991b1b; }
        .desc { font-size:0.85rem; color:#cbd5f5; margin:8px 0; }
        .role { font-size:0.8rem; color:#a5b4fc; }
        .muted { color:#888; }
      `}</style>
    </div>
  );
};

const StatusCard = ({ title, value }) => (
  <div className="card">
    <h5>{title}</h5>
    <strong>{value}</strong>
  </div>
);

export default UserDashboard;
