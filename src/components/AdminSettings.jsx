import React, { useEffect, useState } from "react";
import { FaCog, FaArrowLeft, FaIdBadge, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { updateAdminProfile } from "../services/EmployeeService";
import { addAdminNotification } from "./adminNotifications";

const AdminSettings = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    id: "",
    adminId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  /* ================= LOAD ADMIN ================= */
  useEffect(() => {
    setAdmin({
      id: localStorage.getItem("id") || "",
      adminId: localStorage.getItem("adminId") || "",
      fullName: localStorage.getItem("fullName") || "",
      email: localStorage.getItem("email") || "",
      phoneNumber: localStorage.getItem("phoneNumber") || "",
    });
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  /* ================= SAVE SETTINGS ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!admin.fullName || !admin.email || !admin.phoneNumber) {
      toast.error("All fields are required");
      return;
    }

    // ✅ SPLIT FULL NAME
    const nameParts = admin.fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    toast.promise(
      updateAdminProfile(admin.id, {
        firstName,
        lastName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
      }),
      {
        loading: "Saving changes...",
        success: () => {
          localStorage.setItem("fullName", admin.fullName);
          localStorage.setItem("email", admin.email);
          localStorage.setItem("phoneNumber", admin.phoneNumber);
          addAdminNotification("Admin profile updated successfully");
          setTimeout(() => navigate("/admin-dashboard"), 1500);
          window.dispatchEvent(new Event("admin-profile-updated"));
          return "Admin profile updated successfully ⚙️";
        },
        error: "Failed to update profile",
      }
    );
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="admin-settings-page">
        <div className="settings-card">
          <h2>
            <FaCog /> Admin Settings
          </h2>
          <p className="sub-text">Update your admin profile details</p>

          <form onSubmit={handleSubmit}>
            {/* ADMIN ID */}
            <div className="field">
              <label>Admin ID</label>
              <div className="readonly">
                <FaIdBadge /> {admin.adminId}
              </div>
            </div>

            {/* FULL NAME */}
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={admin.fullName}
                onChange={handleChange}
              />
            </div>

            {/* EMAIL */}
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
              />
            </div>

            {/* PHONE */}
            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={admin.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <button className="save-btn">Save Changes</button>
          </form>

          <button
            className="back-btn"
            onClick={() => navigate("/admin-dashboard")}>
            <FaArrowLeft /> Back to Dashboard
          </button>
        </div>
      </div>

      {/* ===== STYLES (ADMIN LOGIN THEME) ===== */}
      <style>{`
        .admin-settings-page {
          min-height: 100vh;
          background: #f6e0c2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settings-card {
          background: #0f0f0f;
          color: #fff;
          padding: 40px;
          width: 420px;
          border-radius: 22px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        h2 {
          color: #f2c38b;
          text-align: center;
        }

        .sub-text {
          text-align: center;
          color: #bbb;
          font-size: 0.9rem;
          margin-bottom: 25px;
        }

        .field {
          margin-bottom: 18px;
        }

        label {
          font-size: 0.85rem;
          color: #bbb;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #333;
          background: #1f1f1f;
          color: #fff;
        }

        input:focus {
          border-color: #f2c38b;
        }

        .readonly {
          padding: 12px;
          border-radius: 10px;
          background: #1f1f1f;
          color: #f2c38b;
          font-weight: 700;
          display: flex;
          gap: 8px;
        }

        .save-btn {
          width: 100%;
          margin-top: 20px;
          background: #f2c38b;
          color: #000;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          border: none;
        }

        .back-btn {
          margin-top: 18px;
          width: 100%;
          background: transparent;
          border: 1px solid #f2c38b;
          color: #f2c38b;
          padding: 12px;
          border-radius: 12px;
        }
      `}</style>
    </>
  );
};

export default AdminSettings;
