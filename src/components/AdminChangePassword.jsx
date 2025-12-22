import React, { useState } from "react";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { adminChangePassword } from "../services/EmployeeService";
import { addAdminNotification } from "./adminNotifications";

const AdminChangePassword = () => {
  const navigate = useNavigate();

  const adminId = localStorage.getItem("id");

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.promise(
      adminChangePassword(adminId, {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      }),
      {
        loading: "Updating password...",
        success: () => {
          setTimeout(() => navigate("/admin-dashboard"), 1500);
          addAdminNotification("Admin password updated successfully");
          return "Password updated successfully 🔐";
        },
        error: "Invalid old password",
      }
    );
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="admin-change-page">
        <div className="card">
          {/* HEADER */}
          <h2>
            <FaLock /> Change Password
          </h2>
          <p className="sub-text">Keep your admin account secure</p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
              />
            </div>

            <button className="submit-btn">Update Password</button>
          </form>

          {/* BACK */}
          <button
            className="back-btn"
            onClick={() => navigate("/admin-dashboard")}>
            <FaArrowLeft /> Back to Dashboard
          </button>
        </div>
      </div>

      {/* ===== STYLES (ADMIN LOGIN THEME) ===== */}
      <style>{`
        .admin-change-page {
          min-height: 100vh;
          background: #f6e0c2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
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
          margin-bottom: 8px;
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
          outline: none;
        }

        input:focus {
          border-color: #f2c38b;
        }

        .submit-btn {
          width: 100%;
          margin-top: 20px;
          background: #f2c38b;
          color: #000;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .back-btn {
          margin-top: 20px;
          width: 100%;
          background: transparent;
          border: 1px solid #f2c38b;
          color: #f2c38b;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default AdminChangePassword;
