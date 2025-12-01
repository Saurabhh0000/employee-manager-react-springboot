import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

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

  // MODAL STATES
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Handle Input
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Load employee when editing
  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => setEmployee(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  // Validation
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

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      if (id) {
        await updateEmployee(id, employee);
        setModalMessage("Employee updated successfully!");
      } else {
        await createEmployee(employee);
        setModalMessage("Employee added successfully!");
      }

      setShowSuccessModal(true); // SHOW SUCCESS MODAL
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Something went wrong!");
      setShowSuccessModal(true);
    }
  };

  // After modal close → redirect to list page
  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/employees");
  };

  return (
    <>
      {/* ======================== SUCCESS MODAL ======================== */}
      {showSuccessModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title fw-bold">Success</h5>
                <button className="btn-close" onClick={handleModalClose}></button>
              </div>

              <div className="modal-body">
                <p className="mb-0">{modalMessage}</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={handleModalClose}
                >
                  OK
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================== MAIN FORM ======================== */}
      <div className="container my-5">
        <h2
          className="text-center fw-bold mb-4"
          style={{
            color: "#B45309",
            letterSpacing: "-0.5px",
            textShadow: "0 1px 4px rgba(255,165,0,0.4)",
          }}
        >
          <FaUserPlus className="me-2" />
          {id ? "Update Employee" : "Add New Employee"}
        </h2>

        <div
          className="p-4 mx-auto"
          style={{
            width: "600px",
            background: "linear-gradient(180deg, #FFFFFF, #FEF3C7)",
            borderRadius: "16px",
            border: "1px solid #FDE68A",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="row">

              {/* FIRST NAME */}
              <div className="col-md-6 mb-3">
                <label className="fw-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={employee.firstName}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: errors.firstName ? "2px solid red" : "1px solid #FBBF24",
                  }}
                />
                {errors.firstName && (
                  <small className="text-danger">{errors.firstName}</small>
                )}
              </div>

              {/* LAST NAME */}
              <div className="col-md-6 mb-3">
                <label className="fw-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={employee.lastName}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: errors.lastName ? "2px solid red" : "1px solid #FBBF24",
                  }}
                />
                {errors.lastName && (
                  <small className="text-danger">{errors.lastName}</small>
                )}
              </div>

              {/* EMAIL */}
              <div className="col-md-12 mb-3">
                <label className="fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={employee.email}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: errors.email ? "2px solid red" : "1px solid #FBBF24",
                  }}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* PHONE */}
              <div className="col-md-12 mb-4">
                <label className="fw-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  value={employee.phoneNumber}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: errors.phoneNumber ? "2px solid red" : "1px solid #FBBF24",
                  }}
                />
                {errors.phoneNumber && (
                  <small className="text-danger">{errors.phoneNumber}</small>
                )}
              </div>

            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn px-4 py-2 text-white fw-semibold"
                style={{
                  background: "linear-gradient(90deg, #D97706, #F59E0B)",
                  borderRadius: "25px",
                  boxShadow: "0 4px 12px rgba(245,158,11,0.5)",
                }}
              >
                <FaUserPlus className="me-2" />
                {id ? "Update Employee" : "Add Employee"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
