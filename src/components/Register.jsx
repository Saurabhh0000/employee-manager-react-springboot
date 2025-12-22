import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthService";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const [firstName, ...rest] = user.fullName.trim().split(" ");
    const lastName = rest.join(" ");

    const payload = {
      firstName,
      lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      role: "USER",
    };

    registerUser(payload)
      .then(() => {
        toast.success("Registration successful 🎉");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch(() => toast.error("Registration failed ❌"));
  };

  return (
    <>
      {/* TOASTER */}
      <Toaster position="top-right" reverseOrder={false} />

      <div
        style={{
          minHeight: "100vh",
          background: "#FDE3C3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}>
        <div
          style={{
            width: "1100px",
            display: "flex",
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
          }}>
          {/* LEFT IMAGE */}
          <div
            style={{
              flex: 1,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1528605248644-14dd04022da1)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* RIGHT FORM */}
          <div
            style={{
              flex: 1,
              background: "#0f0f0f",
              padding: "55px",
              color: "#fff",
            }}>
            <h2 className="fw-bold mb-4 text-white">Create Employee Account</h2>

            {/* SOCIAL LOGIN */}
            <div className="d-flex gap-3 mb-4">
              <button className="btn w-50" style={socialBtn}>
                <FaGoogle className="me-2" />
                Continue with Google
              </button>

              <button className="btn w-50" style={socialBtn}>
                <FaGithub className="me-2" />
                Continue with GitHub
              </button>
            </div>

            <div className="text-center text-secondary mb-4">
              — OR REGISTER WITH EMAIL —
            </div>

            <form onSubmit={handleRegister}>
              {/* FULL NAME */}
              <Input
                icon={<FaUser />}
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                onChange={handleChange}
              />

              {/* EMAIL */}
              <Input
                icon={<FaEnvelope />}
                label="Email"
                name="email"
                type="email"
                placeholder="john@email.com"
                onChange={handleChange}
              />

              {/* PHONE */}
              <Input
                icon={<FaPhone />}
                label="Phone Number"
                name="phoneNumber"
                placeholder="9876543210"
                onChange={handleChange}
              />

              {/* PASSWORD */}
              <Input
                icon={<FaLock />}
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
              />

              {/* CONFIRM PASSWORD */}
              <Input
                icon={<FaLock />}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
              />

              <button
                type="submit"
                style={{
                  marginTop: "22px",
                  background: "#F2C38B",
                  color: "#000",
                  padding: "14px",
                  width: "100%",
                  borderRadius: "12px",
                  fontWeight: "700",
                  border: "none",
                }}>
                Register Now
              </button>
            </form>

            <p className="mt-4 text-white-50">
              Already have an account?{" "}
              <span
                style={{ color: "#F2C38B", cursor: "pointer" }}
                onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

/* ================= REUSABLE INPUT ================= */
const Input = ({ icon, label, ...props }) => (
  <div className="mb-4">
    <label className="mb-1 text-white">{label}</label>
    <div
      className="d-flex align-items-center"
      style={{
        borderBottom: "1px solid #555",
        paddingBottom: "6px",
      }}>
      <span style={{ color: "#fff", marginRight: "10px" }}>{icon}</span>
      <input
        {...props}
        className="form-control bg-transparent border-0 text-white"
        style={{
          color: "#fff",
          outline: "none",
        }}
        required
      />
    </div>
  </div>
);

const socialBtn = {
  background: "#1f1f1f",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "12px",
  fontWeight: "600",
};

export default Register;
