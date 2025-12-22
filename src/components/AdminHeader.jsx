import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import {
  FaSignOutAlt,
  FaIdBadge,
  FaUserShield,
  FaLock,
  FaHome,
  FaUsers,
  FaUserPlus,
  FaClipboardList,
  FaCog,
  FaBell,
  FaCheckCircle,
  FaEnvelope,
  FaChevronDown,
  FaEdit,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const AdminHeader = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [admin, setAdmin] = useState({
    fullName: "",
    adminId: "",
    role: "",
    email: "",
  });

  /* ===== LOAD ADMIN DATA ===== */
  const loadAdmin = () => {
    setAdmin({
      fullName: localStorage.getItem("fullName") || "Admin User",
      adminId: localStorage.getItem("adminId") || "ADM001",
      role: localStorage.getItem("role") || "ADMIN",
      email: localStorage.getItem("email") || "admin@ems.com",
    });
  };

  useEffect(() => {
    const loadNotifications = () => {
      const stored =
        JSON.parse(localStorage.getItem("adminNotifications")) || [];
      setNotifications(stored);
    };
    loadAdmin();
    loadNotifications();

    // 🔥 listen when new notification is added
    window.addEventListener("admin-notification", loadNotifications);
    window.addEventListener("admin-profile-updated", loadAdmin);

    return () => {
      window.removeEventListener("admin-notification", loadNotifications);
      window.removeEventListener("admin-profile-updated", loadAdmin);
    };
  }, []);

  /* ===== CLOSE DROPDOWN ON OUTSIDE CLICK ===== */
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileOpen) setProfileOpen(false);
      if (notifOpen) setNotifOpen(false);
    };

    if (profileOpen || notifOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileOpen, notifOpen]);

  const logoutAdmin = () => {
    toast.success("Admin logged out successfully 🔐");

    localStorage.clear();

    setTimeout(() => {
      navigate("/admin-login");
    }, 800);
  };

  /* ================= NOTIFICATION HELPERS ================= */
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (index) => {
    const updated = [...notifications];
    updated[index].read = true;
    setNotifications(updated);
    localStorage.setItem("adminNotifications", JSON.stringify(updated));
  };

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("adminNotifications", JSON.stringify(updated));
  };

  return (
    <nav
      style={{
        background: "#0f0f0f",
        borderBottom: "1px solid #1f1f1f",
        position: "sticky",
        top: 0,
        zIndex: 9999,
      }}>
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* ===== LOGO ===== */}
        <Link
          to="/admin-dashboard"
          className="d-flex align-items-center gap-2 text-decoration-none">
          <img
            src={logo}
            alt="logo"
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              padding: 4,
              background: "#1f1f1f",
            }}
          />
          <span className="fw-bold fs-4" style={{ color: "#f2c38b" }}>
            Admin Portal
          </span>
        </Link>

        {/* ===== NAV ===== */}

        <ul
          className="d-flex align-items-center gap-4 mb-0 admin-nav"
          style={{ listStyle: "none" }}>
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
              <FaHome /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/list-employees"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
              <FaUsers /> Employees
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-employee"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
              <FaUserPlus /> Add Employee
            </NavLink>
          </li>

          {/* ===== PROJECTS DROPDOWN ===== */}
          <li>
            <NavLink
              to="/create-project"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
              <FaUserPlus /> Projects
            </NavLink>
          </li>

          {/* 🔔 NOTIFICATIONS */}
          <li
            className="position-relative"
            onClick={(e) => e.stopPropagation()}>
            <div
              onClick={() => setNotifOpen((s) => !s)}
              style={{
                cursor: "pointer",
                position: "relative",
                color: "#f2c38b",
                background: "#1f1f1f",
                borderRadius: 30,
                padding: "8px 14px",
                fontSize: "1.2rem",
              }}>
              <FaBell />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "#dc2626",
                    color: "#fff",
                    borderRadius: "50%",
                    fontSize: "0.7rem",
                    padding: "2px 6px",
                    fontWeight: 700,
                  }}>
                  {unreadCount}
                </span>
              )}
            </div>

            {notifOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 45,
                  width: 320,
                  background: "#0f0f0f",
                  borderRadius: 16,
                  padding: 16,
                  border: "1px solid #1f1f1f",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong style={{ color: "#f2c38b" }}>Notifications</strong>
                  <button
                    onClick={markAllRead}
                    className="btn btn-sm text-white"
                    style={{ fontSize: "0.75rem" }}>
                    Mark all read
                  </button>
                </div>

                {notifications.length === 0 && (
                  <p className="text-muted small mb-0">No notifications</p>
                )}

                {notifications.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      background: n.read ? "#1f1f1f" : "#27272a",
                      padding: 10,
                      borderRadius: 10,
                      marginBottom: 8,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "#fff",
                    }}>
                    <span style={{ fontSize: "0.85rem" }}>{n.message}</span>
                    {!n.read && (
                      <FaCheckCircle
                        style={{ cursor: "pointer", color: "#4ade80" }}
                        onClick={() => markAsRead(i)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>

          {/* ===== PROFILE ===== */}
          <li
            className="position-relative"
            onClick={(e) => e.stopPropagation()}>
            <div
              onClick={() => setProfileOpen((s) => !s)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: 30,
                background: "#1f1f1f",
                border: "1px solid #333",
              }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#f2c38b",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                }}>
                {admin.fullName.charAt(0)}
              </div>
              <span className="fw-semibold text-white">
                {admin.fullName.split(" ")[0]}
              </span>
            </div>

            {/* ===== DROPDOWN ===== */}
            {profileOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 60,
                  width: 340,
                  background: "#0f0f0f",
                  borderRadius: 18,
                  padding: 20,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                  border: "1px solid #1f1f1f",
                  animation: "fadeIn 0.2s ease",
                }}
                onClick={(e) => e.stopPropagation()}>
                {/* ===== PROFILE HEADER ===== */}
                <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                  {/* AVATAR */}
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "#f2c38b",
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                    }}>
                    {admin.fullName.charAt(0)}
                  </div>

                  {/* DETAILS */}
                  <div style={{ flex: 1 }}>
                    <h6
                      style={{ margin: 0, color: "#f2c38b", fontWeight: 700 }}>
                      {admin.fullName}
                    </h6>

                    {/* EMAIL */}
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: "0.8rem",
                        background: "#1f1f1f",
                        padding: "4px 10px",
                        borderRadius: 999,
                        color: "#bbb",
                        display: "inline-block",
                      }}>
                      <FaEnvelope /> {admin.email}
                    </div>

                    {/* BADGES */}
                    <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          background: "#1f1f1f",
                          color: "#f2c38b",
                          padding: "4px 10px",
                          borderRadius: 999,
                          fontWeight: 700,
                        }}>
                        <FaIdBadge /> {admin.adminId}
                      </span>

                      <span
                        style={{
                          fontSize: "0.72rem",
                          background: "#f2c38b",
                          color: "#000",
                          padding: "4px 10px",
                          borderRadius: 999,
                          fontWeight: 800,
                        }}>
                        <FaUserShield /> ADMIN
                      </span>
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: "#1f1f1f" }} />

                {/* ACTIONS */}
                <div className="d-grid gap-2">
                  <button
                    className="btn text-start border-0 bg-transparent text-white"
                    onClick={() => navigate("/admin-change-password")}>
                    <FaLock /> Change Password
                  </button>

                  <button
                    className="btn text-start border-0 bg-transparent text-white"
                    onClick={() => navigate("/admin-settings")}>
                    <FaCog /> Settings
                  </button>
                </div>

                <hr style={{ borderColor: "#1f1f1f" }} />

                {/* LOGOUT */}
                <button
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={logoutAdmin}
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    borderRadius: 12,
                    fontWeight: 600,
                    border: "none",
                  }}>
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      <style>{`
      .admin-nav .nav-link {
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 8px 14px;
  border-radius: 999px;

  color: #fff;
  font-weight: 600;
  text-decoration: none;

  transition: all 0.25s ease;
}

/* Hover */
.admin-nav .nav-link:hover {
  background: #1f1f1f;
  color: #f2c38b;
}

/* ✅ ACTIVE (STAYS AFTER CLICK) */
.admin-nav .nav-link.active {
  background: #1f2937;
  color: #f2c38b;
  box-shadow: 0 0 0 1px #f2c38b inset;
}
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default AdminHeader;
