import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaSave,
  FaIdBadge,
  FaUserShield,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/EmployeeService";
import toast, { Toaster } from "react-hot-toast";

const Settings = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const [employee, setEmployee] = useState({
    fullName: "",
    employeeId: "",
    role: "",
  });

  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!id) {
      toast.error("Please login again");
      navigate("/login");
      return;
    }

    getEmployeeById(id)
      .then((res) => {
        const data = res.data;
        setEmployee({
          fullName: `${data.firstName} ${data.lastName}`,
          employeeId: data.employeeId,
          role: data.role,
        });

        setForm({
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        });
      })
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.phoneNumber) {
      toast.error("All fields are required");
      return;
    }

    toast
      .promise(updateEmployee(id, form), {
        loading: "Updating profile...",
        success: "Profile updated successfully ✅",
        error: "Update failed ❌",
      })
      .then(() => {
        // ✅ update localStorage
        localStorage.setItem("email", form.email);
        localStorage.setItem("phoneNumber", form.phoneNumber);

        // ✅ notify header/profile to reload data
        window.dispatchEvent(new Event("user-profile-updated"));

        setTimeout(() => navigate("/dashboard"), 1200);
      });
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}>
      <Toaster position="top-right" />

      <form
        onSubmit={handleSubmit}
        style={{
          width: "460px",
          background: "#ffffff",
          borderRadius: "22px",
          padding: "40px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        }}>
        <h3 className="fw-bold text-center mb-4" style={{ color: "#111" }}>
          ⚙️ Account Settings
        </h3>

        {/* READ ONLY */}
        <ReadOnlyField
          icon={<FaIdBadge />}
          label="Employee ID"
          value={employee.employeeId}
        />
        <ReadOnlyField
          icon={<FaUser />}
          label="Full Name"
          value={employee.fullName}
        />
        <ReadOnlyField
          icon={<FaUserShield />}
          label="Role"
          value={employee.role}
        />

        <hr style={{ margin: "25px 0" }} />

        {/* EDITABLE */}
        <EditableField
          icon={<FaEnvelope />}
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <EditableField
          icon={<FaPhone />}
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            marginTop: "25px",
            background: "#111",
            color: "#fff",
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            fontWeight: "700",
            fontSize: "1rem",
          }}>
          <FaSave /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;

/* ===== COMPONENTS ===== */

const ReadOnlyField = ({ icon, label, value }) => (
  <div className="mb-3">
    <label style={{ fontSize: "0.85rem", color: "#555" }}>{label}</label>
    <div style={fieldBox}>
      <span style={iconStyle}>{icon}</span>
      <input value={value} disabled style={readOnlyInput} />
    </div>
  </div>
);

const EditableField = ({ icon, label, ...props }) => (
  <div className="mb-3">
    <label style={{ fontSize: "0.85rem", color: "#555" }}>{label}</label>
    <div style={fieldBox}>
      <span style={iconStyle}>{icon}</span>
      <input {...props} style={editableInput} required />
    </div>
  </div>
);

/* ===== STYLES ===== */
const fieldBox = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  paddingBottom: "6px",
};

const iconStyle = {
  color: "#111",
  marginRight: "10px",
};

const readOnlyInput = {
  border: "none",
  outline: "none",
  width: "100%",
  background: "transparent",
  color: "#888",
  fontWeight: "600",
};

const editableInput = {
  border: "none",
  outline: "none",
  width: "100%",
  background: "transparent",
  color: "#111",
  fontWeight: "600",
};
