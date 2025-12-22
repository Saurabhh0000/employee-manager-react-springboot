import React, { useEffect, useState } from "react";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import {
  createEmployee,
  getEmployeeById,
  adminUpdateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addAdminNotification } from "./adminNotifications";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // LOAD EMPLOYEE FOR EDIT
  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((res) => setEmployee(res.data))
        .catch(() => toast.error("Failed to load employee"));
    }
  }, [id]);

  // VALIDATION
  const validate = () => {
    let temp = {};
    if (!employee.firstName.trim()) temp.firstName = "First name is required";
    if (!employee.lastName.trim()) temp.lastName = "Last name is required";
    if (!employee.email.trim()) temp.email = "Email is required";
    if (!/^\d{10}$/.test(employee.phoneNumber))
      temp.phoneNumber = "Enter a 10-digit phone number";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (id) {
        await adminUpdateEmployee(id, employee);
        toast.success("Employee updated successfully ✅");
        addAdminNotification(
          `Employee ${employee.firstName} updated successfully`
        );
      } else {
        await createEmployee(employee);
        toast.success("Employee added successfully 🎉");
        addAdminNotification(`New employee ${employee.firstName} added`);
      }

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1200);
    } catch {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <>
      {/* 🔔 HOT TOASTER */}
      <Toaster position="top-right" />

      <div className="add-employee-page">
        <div className="form-card">
          {/* 🔙 BACK BUTTON */}
          <button
            className="back-btn"
            onClick={() => navigate("/admin-dashboard")}>
            <FaArrowLeft /> Back to Dashboard
          </button>

          <h2>
            <FaUserPlus /> {id ? "Update Employee" : "Add New Employee"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid">
              <div>
                <label>First Name</label>
                <input
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <small>{errors.firstName}</small>}
              </div>

              <div>
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <small>{errors.lastName}</small>}
              </div>

              <div className="full">
                <label>Email</label>
                <input
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                />
                {errors.email && <small>{errors.email}</small>}
              </div>

              <div className="full">
                <label>Phone Number</label>
                <input
                  name="phoneNumber"
                  value={employee.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <small>{errors.phoneNumber}</small>}
              </div>
            </div>

            <button className="submit-btn">
              <FaUserPlus /> {id ? "Update Employee" : "Add Employee"}
            </button>
          </form>
        </div>
      </div>

      {/* ===== STYLES (ADMIN THEME UNCHANGED) ===== */}
      <style>{`
        .add-employee-page {
          min-height: 100vh;
          background: #f6e0c2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-card {
          background: #0f0f0f;
          color: #fff;
          padding: 40px;
          width: 520px;
          border-radius: 22px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .back-btn {
          background: none;
          border: none;
          color: #f2c38b;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .back-btn:hover {
          text-decoration: underline;
        }

        .form-card h2 {
          text-align: center;
          color: #f2c38b;
          margin-bottom: 30px;
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

        small {
          color: #ff6b6b;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .grid .full {
          grid-column: span 2;
        }

        .submit-btn {
          margin-top: 30px;
          width: 100%;
          background: #f2c38b;
          color: #000;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default AddEmployee;
