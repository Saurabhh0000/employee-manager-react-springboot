import React, { useState } from "react";
import { FaLock, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { adminLogin } from "../services/AuthService";
import adminIllustration from "../assets/admin-logo.png"; // 👈 ADD THIS IMAGE

const AdminLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const submit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Email and password required");
      return;
    }

    toast.promise(adminLogin(data), {
      loading: "Authenticating...",
      success: (res) => {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("adminId", res.data.adminId);
        localStorage.setItem("fullName", res.data.fullName);
        localStorage.setItem("role", res.data.role);

        setTimeout(() => navigate("/admin-dashboard"), 1000);
        return "Admin login successful 🔐";
      },
      error: "Invalid admin credentials",
    });
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="login-page">
        {/* LEFT ADMIN IMAGE */}
        <div
          className="login-image"
          style={{
            backgroundImage: `url(${adminIllustration})`,
          }}>
          {/* OPTIONAL OVERLAY TEXT */}
          <div className="overlay-text">
            <h1>Admin Panel</h1>
            <p>Secure access to EMS management</p>
          </div>
        </div>

        {/* FORM */}
        <form className="login-form" onSubmit={submit}>
          <h2>Admin Login</h2>

          <div className="field">
            <label>Email</label>
            <div className="input-box">
              <FaUserShield />
              <input
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-box">
              <FaLock />
              <input
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button className="login-btn">Login</button>

          <p className="switch-link" onClick={() => navigate("/login")}>
            Login as User
          </p>
        </form>
      </div>

      {/* SAME CSS + SMALL ADDITION */}
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          background: #f6e0c2;
        }

        .login-image {
  flex: 1;
  background-size: 75%;    /* medium size */
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f6e0c2;
}


        .overlay-text {
          position: absolute;
          bottom: 40px;
          left: 40px;
          color: #0f0f0f;
          max-width: 300px;
        }

        .overlay-text h1 {
          font-size: 2.2rem;
          margin-bottom: 6px;
        }

        .overlay-text p {
          opacity: 0.85;
          font-size: 0.95rem;
        }

        .login-form {
          flex: 1;
          background: #0f0f0f;
          color: #fff;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-form h2 {
          margin-bottom: 30px;
          font-size: 28px;
        }

        .field {
          margin-bottom: 22px;
        }

        .field label {
          font-size: 14px;
          color: #bbb;
        }

        .input-box {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #444;
          padding-bottom: 6px;
        }

        .input-box input {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          width: 100%;
        }

        .login-btn {
          margin-top: 30px;
          background: #f2c38b;
          color: #000;
          border: none;
          padding: 14px;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
        }

        .switch-link {
          margin-top: 20px;
          color: #f2c38b;
          cursor: pointer;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default AdminLogin;
