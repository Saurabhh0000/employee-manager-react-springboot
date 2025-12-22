import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import {
  FaSignOutAlt,
  FaIdBadge,
  FaUserShield,
  FaLock,
  FaCog,
  FaLifeRing,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    fullName: "",
    email: "",
    employeeId: "",
    role: "",
  });

  /* ================= LOAD USER ================= */
  const loadUser = () => {
    const firstNameLS = localStorage.getItem("firstName");
    const fullNameLS = localStorage.getItem("fullName");
    const emailLS = localStorage.getItem("email");
    const employeeIdLS = localStorage.getItem("employeeId");
    const roleLS = localStorage.getItem("role");

    let finalFirstName = firstNameLS;
    if (!finalFirstName && fullNameLS) {
      finalFirstName = fullNameLS.split(" ")[0];
    }

    setUser({
      firstName: finalFirstName || "User",
      fullName: fullNameLS || "",
      email: emailLS || "",
      employeeId: employeeIdLS || "",
      role: roleLS || "USER",
    });
  };
  /* ================= INITIAL LOAD + LISTENER ================= */
  useEffect(() => {
    loadUser();

    // 🔥 Listen for profile updates
    window.addEventListener("user-profile-updated", loadUser);

    return () => {
      window.removeEventListener("user-profile-updated", loadUser);
    };
  }, []);

  /* ================= CLOSE ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const close = () => setProfileOpen(false);
    if (profileOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [profileOpen]);

  const logoutUser = () => {
    toast.success("User logged out successfully 🔐");

    localStorage.clear();

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  return (
    <nav
      style={{
        background: "linear-gradient(90deg,#ffffff,#f8fafc)",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 9999,
      }}>
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* LOGO */}
        <Link
          to="/dashboard"
          className="d-flex align-items-center gap-2 text-decoration-none">
          <img
            src={logo}
            alt="logo"
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              border: "1px solid #ddd",
              padding: 4,
              background: "#fff",
            }}
          />
          <span className="fw-bold fs-4 text-dark">EMS Portal</span>
        </Link>

        {/* NAV */}
        <ul
          className="d-flex align-items-center gap-4 mb-0"
          style={{ listStyle: "none" }}>
          <li>
            <Link
              className="fw-semibold text-dark text-decoration-none"
              to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              className="fw-semibold text-dark text-decoration-none"
              to="/employees">
              Employees
            </Link>
          </li>

          {/* PROFILE */}
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
                background: "#f1f5f9",
                border: "1px solid #e5e7eb",
              }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#6a5af9,#c048ff)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}>
                {user.firstName.charAt(0)}
              </div>
              <span className="fw-semibold text-dark">{user.firstName}</span>
            </div>

            {profileOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 60,
                  width: 340,
                  background: "#fff",
                  borderRadius: 16,
                  padding: 18,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                  border: "1px solid #eee",
                  animation: "fadeIn 0.2s ease",
                }}>
                {/* PROFILE HEADER */}
                <div className="d-flex gap-3 mb-3">
                  <div
                    style={{
                      width: 85,
                      height: 50,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#6a5af9,#c048ff)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                    }}>
                    {user.firstName.charAt(0)}
                  </div>

                  <div style={{ lineHeight: 1.3 }}>
                    <h6 className="fw-bold mb-1">
                      {user.fullName || user.firstName}
                    </h6>

                    {/* EMAIL BADGE */}
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#0f172a",
                        background: "#f1f5f9",
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        marginBottom: "6px",
                        fontWeight: 600,
                      }}>
                      <FaEnvelope style={{ marginRight: 4 }} />
                      {user.email}
                    </div>

                    {/* EMPLOYEE ID */}
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#4338ca",
                        background: "#eef2ff",
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: "999px",
                        fontWeight: "700",
                      }}>
                      <FaIdBadge style={{ marginRight: 4 }} />
                      {user.employeeId}
                    </div>

                    {/* ROLE */}
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: user.role === "ADMIN" ? "#c2410c" : "#0369a1",
                        background:
                          user.role === "ADMIN" ? "#fff7ed" : "#ecfeff",
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: "999px",
                        marginLeft: "6px",
                        fontWeight: "700",
                      }}>
                      <FaUserShield style={{ marginRight: 4 }} />
                      {user.role}
                    </div>
                  </div>
                </div>

                <hr />

                {/* ACTIONS */}
                <div className="d-grid gap-2">
                  <button
                    className="btn text-start border-0 bg-transparent"
                    onClick={() => navigate("/change-password")}>
                    <FaLock /> Change Password
                  </button>

                  <button
                    className="btn text-start border-0 bg-transparent"
                    onClick={() => navigate("/settings")}>
                    <FaCog /> Settings
                  </button>

                  <button
                    className="btn text-start border-0 bg-transparent"
                    disabled>
                    <FaLifeRing /> Support
                  </button>
                </div>

                <hr />

                <button
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={logoutUser}
                  style={{
                    background: "#fff4f4",
                    color: "#dc2626",
                    borderRadius: 12,
                    fontWeight: 600,
                    border: "1px solid #fee2e2",
                  }}>
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Header;
