import React, { useState } from "react";
import { FaLock, FaUser, FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../services/AuthService";
import adminIllustration from "../assets/user-login.png"; // 👈 ADD THIS IMAGE

const UserLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const submit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Email and password required");
      return;
    }

    toast.promise(loginUser(data), {
      loading: "Logging in...",
      success: (res) => {
        if (res.data.role !== "USER") {
          throw new Error("Not a user account");
        }

        localStorage.setItem("id", res.data.id);
        localStorage.setItem("employeeId", res.data.employeeId);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("fullName", res.data.fullName);
        localStorage.setItem("role", res.data.role);

        setTimeout(() => navigate("/dashboard"), 1000);
        return "User login successful 👋";
      },
      error: (err) => err.message || "Invalid credentials",
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
            <h1>User Panel</h1>
            <p>Access to EMS management</p>
          </div>
        </div>

        <form className="login-form" onSubmit={submit}>
          <h2>User Login</h2>

          {/* ===== SOCIAL LOGIN ===== */}
          <div className="social-box">
            <button type="button" className="social-btn google">
              <FaGoogle /> Continue with Google
            </button>

            <button type="button" className="social-btn github">
              <FaGithub /> Continue with GitHub
            </button>
          </div>

          <div className="divider">OR LOGIN WITH EMAIL</div>

          {/* EMAIL */}
          <div className="field">
            <label>Email</label>
            <div className="input-box">
              <FaUser />
              <input
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="field">
            <label>Password</label>
            <div className="input-box">
              <FaLock />
              <input
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          <button className="login-btn">Login</button>

          {/* ===== BOTTOM LINKS ===== */}
          <div className="bottom-links">
            <span onClick={() => navigate("/register")}>
              New User? Register
            </span>
            <span onClick={() => navigate("/admin-login")}>Login as Admin</span>
          </div>
        </form>
      </div>

      {/* ===== CSS IN SAME FILE ===== */}
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
          color: #0f0f0f
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
          margin-bottom: 20px;
          font-size: 28px;
        }

        .social-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-btn {
          border: 1px solid #333;
          background: #1f1f1f;
          color: #fff;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .divider {
          margin: 20px 0;
          text-align: center;
          color: #999;
          font-size: 12px;
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
          margin-top: 25px;
          background: #f2c38b;
          color: #000;
          border: none;
          padding: 14px;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
        }

        .bottom-links {
          margin-top: 22px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #f2c38b;
          cursor: pointer;
        }

        .bottom-links span:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default UserLogin;
