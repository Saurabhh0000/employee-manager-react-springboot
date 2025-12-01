import React from "react";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg, #D97706, #F59E0B, #FBBF24)",
        padding: "12px 0",
        boxShadow: "0 3px 14px rgba(0,0,0,0.25)",
      }}
    >
      <div className="container">

        {/* Logo + Brand */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <img
            src={logo}
            alt="logo"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "#fff",
              padding: "5px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          />
          <span
            className="fw-bold fs-4 text-dark"
            style={{
              textShadow: "0 1px 4px rgba(255,255,255,0.7)",
              letterSpacing: "-0.5px",
            }}
          >
            Employee Manager
          </span>
        </a>

        {/* Mobile */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto gap-4">

            {["Home", "Employees", "Add Employee"].map((item) => (
  <li className="nav-item" key={item}>
    <Link
      className="nav-link fw-semibold text-dark"
      to={
        item === "Home"
          ? "/"
          : item === "Employees"
          ? "/employees"
          : "/add-employee"
      }
      style={{ opacity: 0.8 }}
    >
      {item}
    </Link>
  </li>
))}


          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Header;
