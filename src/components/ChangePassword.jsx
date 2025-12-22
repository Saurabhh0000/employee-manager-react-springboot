import React, { useState } from "react";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/EmployeeService";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id"); // numeric id

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

    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    };

    toast
      .promise(changePassword(id, payload), {
        loading: "Changing password...",
        success: "Password changed successfully 🔐",
        error: (err) => err?.response?.data || "Old password is incorrect",
      })
      .then(() => {
        setTimeout(() => {
          toast.success("Redirecting to dashboard 🚀");
          navigate("/dashboard");
        }, 1200);
      });
  };

  return (
    <div
      style={{
        minHeight: "73vh",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}>
      <Toaster position="top-right" />

      <form
        onSubmit={handleSubmit}
        style={{
          width: "420px",
          background: "#ffffff",
          borderRadius: "22px",
          padding: "40px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        }}>
        <h3 className="fw-bold text-center mb-4" style={{ color: "#111" }}>
          <FaLock /> Change Password
        </h3>

        {/* INPUTS */}
        <InputField
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          onChange={handleChange}
        />

        <InputField
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
        />

        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          onChange={handleChange}
        />

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "12px", marginTop: "25px" }}>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{
              flex: 1,
              background: "#f3f4f6",
              color: "#111",
              padding: "12px",
              borderRadius: "14px",
              border: "1px solid #ddd",
              fontWeight: "600",
            }}>
            <FaArrowLeft /> Back
          </button>

          <button
            type="submit"
            style={{
              flex: 1,
              background: "#111",
              color: "#fff",
              padding: "12px",
              borderRadius: "14px",
              border: "none",
              fontWeight: "700",
            }}>
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

/* ===== REUSABLE INPUT ===== */
const InputField = ({ ...props }) => (
  <div style={{ marginBottom: "18px" }}>
    <input
      {...props}
      className="form-control"
      style={{
        border: "none",
        borderBottom: "1px solid #ccc",
        borderRadius: "0",
        padding: "10px 4px",
        fontSize: "0.95rem",
        outline: "none",
        boxShadow: "none",
      }}
      required
    />
  </div>
);
