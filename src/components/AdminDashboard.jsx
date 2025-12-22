import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaUserShield,
  FaIdBadge,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getEmployeeCount } from "../services/EmployeeService";
import { getAllProjects } from "../services/ProjectService";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const fullName = localStorage.getItem("fullName") || "Admin";
  const adminId = localStorage.getItem("adminId");
  const role = localStorage.getItem("role");
  const firstName = fullName.split(" ")[0];

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [projects, setProjects] = useState([]);

  const [activeProjects, setActiveProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState("ALL");

  const filteredProjects =
    projectFilter === "COMPLETED"
      ? projects.filter((p) => p.status === "COMPLETED")
      : projects;

  useEffect(() => {
    if (!adminId || role !== "ADMIN") navigate("/admin-login");
  }, [adminId, role, navigate]);

  const loadDashboard = async () => {
    setLoading(true);

    try {
      const empRes = await getEmployeeCount();
      setTotalEmployees(Number(empRes?.data) || 0);
    } catch {
      setTotalEmployees(0);
    }

    try {
      const projectRes = await getAllProjects();
      const list = Array.isArray(projectRes?.data) ? projectRes.data : [];
      setProjects(list);
      setActiveProjects(list.filter((p) => p.status === "ACTIVE").length);
      setCompletedProjects(list.filter((p) => p.status === "COMPLETED").length);
    } catch {
      setProjects([]);
      setActiveProjects(0);
      setCompletedProjects(0);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading dashboard...</div>;

  return (
    <div className="admin-layout">
      <main className="content">
        {/* TOP BAR */}
        <div className="top-bar">
          <div>
            <h1>
              Welcome back, <span>{firstName}</span> 👋
            </h1>
            <p>You’re managing the entire EMS system</p>
          </div>

          <div className="admin-pill-group">
            <span className="admin-pill id">
              <FaIdBadge /> {adminId}
            </span>
            <span className="admin-pill role">
              <FaUserShield /> {role}
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="stats">
          <DashboardCard
            icon={<FaUsers />}
            value={totalEmployees}
            label="Total Employees"
          />
          <DashboardCard
            icon={<FaClipboardList />}
            value={projects.length}
            label="Total Projects"
          />
          <DashboardCard
            icon={<FaChartBar />}
            value={activeProjects}
            label="Active Projects"
          />
          <DashboardCard
            icon={<FaChartBar />}
            value={completedProjects}
            label="Completed Projects"
          />
        </div>

        {/* PROJECTS */}
        <div className="project-wrapper">
          <div className="project-header">
            <h3>📁 Projects</h3>

            <div className="project-filters">
              <button
                className={
                  projectFilter === "ALL" ? "filter-btn active" : "filter-btn"
                }
                onClick={() => setProjectFilter("ALL")}>
                All Projects
              </button>

              <button
                className={
                  projectFilter === "COMPLETED"
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => setProjectFilter("COMPLETED")}>
                Completed Projects
              </button>
            </div>
          </div>

          <div className="project-grid">
            {filteredProjects.map((p) => (
              <div
                key={p.projectCode}
                className="project-card"
                onClick={() => navigate(`/admin/project/${p.projectCode}`)}
                style={{ cursor: "pointer" }}>
                <span className="project-code">
                  <FaClipboardList /> {p.projectCode}
                </span>

                <span
                  className={`status ${
                    p.status === "ACTIVE" ? "active" : "completed"
                  }`}>
                  {p.status}
                </span>

                <FaClipboardList className="icon" />
                <h4>{p.projectName}</h4>

                <p className="desc">{p.description}</p>

                <div className="member-list">
                  {p.members?.map((m) => (
                    <div key={m.employeeId} className="member-item">
                      <span className="member-id">{m.employeeId}</span>
                      <span className="member-role">{m.memberRole}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CSS */}
      <style>{`
        * { box-sizing: border-box; }

        .admin-layout {
          min-height: 100vh;
          background: #f6e0c2;
        }

        .content {
          padding: 30px;
        }

        .top-bar {
          background:#0f0f0f;
          color:#fff;
          padding:25px;
          border-radius:18px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          flex-wrap:wrap;
          gap:12px;
        }

        .admin-pill-group { display:flex; gap:10px; }

        .admin-pill {
          display:flex;
          gap:6px;
          align-items:center;
          padding:8px 14px;
          border-radius:999px;
          font-size:0.8rem;
          font-weight:700;
        }

        .admin-pill.id { background:#1f2937; color:#f2c38b; }
        .admin-pill.role { background:#f2c38b; color:#000; }

        .stats {
          margin-top:30px;
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
          gap:20px;
        }

        .stat-card {
          background:#0f0f0f;
          color:#fff;
          padding:26px;
          border-radius:18px;
          text-align:center;
        }

        .project-wrapper {
          margin-top:40px;
          background:#fef3c7;
          padding:24px;
          border-radius:20px;
        }

        .project-grid {
          margin-top:20px;
          display:grid;
          grid-template-columns:repeat(4,2fr);
          gap:24px;
        }

        .project-card {
          position:relative;
          background:linear-gradient(145deg,#0f0f0f,#181818);
          color:#fff;
          padding:22px 18px 18px 28px;
          border-radius:20px;
          display:flex;
          flex-direction:column;
          box-shadow:0 15px 35px rgba(0,0,0,0.35);
        }

        .project-card::before {
          content:"";
          position:absolute;
          left:0; top:0;
          height:100%; width:6px;
          background:linear-gradient(180deg,#f2c38b,#d4a373);
          border-radius:20px 0 0 20px;
        }

        .project-code {
          position:absolute;
          top:14px; left:14px;
          display:flex; gap:6px;
          background:#1f2937;
          color:#f2c38b;
          padding:4px 10px;
          border-radius:999px;
          font-size:0.7rem;
          font-weight:700;
        }

        .status {
          position:absolute;
          top:14px; right:14px;
          padding:4px 10px;
          border-radius:999px;
          font-size:0.7rem;
          font-weight:700;
        }

        .status.active { background:#dcfce7; color:#166534; }
        .status.completed { background:#fee2e2; color:#991b1b; }

        .icon {
          font-size:2.2rem;
          color:#f2c38b;
          margin:52px auto 10px;
        }

        h4 {
          text-align:center;
          color:#f2c38b;
          margin-bottom:6px;
        }

        .desc {
          text-align:center;
          font-size:0.85rem;
          color:#d1d5db;
          flex-grow:1;
        }

        .member-list {
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        .member-item {
          display:flex;
          justify-content:space-between;
          background:#003049;
          padding:4px 10px;
          border-radius:10px;
          font-size:0.75rem;
        }

        .member-id { color:#f2c38b; font-weight:700; }
        .member-role {
          background:#020617;
          padding:3px 8px;
          border-radius:999px;
          font-size:0.65rem;
        }
          /* ===== PROJECT HEADER ===== */
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

/* ===== FILTER BUTTONS ===== */
.project-filters {
  display: flex;
  gap: 10px;
}

.filter-btn {
  background: #1f2937;
  color: #f2c38b;
  border: none;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #111827;
}

.filter-btn.active {
  background: #f2c38b;
  color: #000;
}


        @media (max-width:1100px) {
          .project-grid { grid-template-columns:repeat(2,1fr); }
        }

        @media (max-width:700px) {
          .project-grid { grid-template-columns:1fr; }
        }
      `}</style>
    </div>
  );
};

const DashboardCard = ({ icon, value, label }) => (
  <div className="stat-card">
    <div style={{ fontSize: "2rem", color: "#f2c38b" }}>{icon}</div>
    <h2>{value}</h2>
    <p>{label}</p>
  </div>
);

export default AdminDashboard;
