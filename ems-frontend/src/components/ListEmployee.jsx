import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  listEmployees,
  deleteEmployeeById,
} from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployee = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // MODAL STATES
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    listEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Open Confirm Delete Modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setModalMessage("Are you sure you want to delete this employee?");
    setShowConfirmModal(true);
  };

  // DELETE EMPLOYEE
  const handleDelete = () => {
    setShowConfirmModal(false); // close confirmation modal

    deleteEmployeeById(deleteId)
      .then(() => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== deleteId));

        setModalMessage("Employee deleted successfully!");
        setShowSuccessModal(true);
      })
      .catch(() => {
        setModalMessage("Failed to delete employee!");
        setShowSuccessModal(true);
      });
  };

  return (
    <>
      {/* ======================== CONFIRM DELETE MODAL ======================== */}
      {showConfirmModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title fw-bold">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-0">{modalMessage}</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Yes, Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

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
                <button
                  className="btn-close"
                  onClick={() => setShowSuccessModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-0">{modalMessage}</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => setShowSuccessModal(false)}
                >
                  OK
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================== MAIN CONTENT ======================== */}
      <div className="container my-5">
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            color: "#B45309",
            letterSpacing: "-0.5px",
            textShadow: "0 1px 4px rgba(255,165,0,0.4)",
          }}
        >
          Employee Directory
        </h2>

        {/* Search Bar */}
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            placeholder="Search employees..."
            className="form-control w-50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "30px",
              padding: "12px 20px",
              border: "1px solid #FBBF24",
              boxShadow: "0 3px 8px rgba(251,191,36,0.4)",
            }}
          />
        </div>

        {/* TABLE */}
        <div
          className="p-4"
          style={{
            background: "linear-gradient(180deg, #FFFFFF, #FEF3C7)",
            borderRadius: "18px",
            border: "1px solid #FDE68A",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <table className="table align-middle">
            <thead>
              <tr
                style={{
                  background: "#FEF3C7",
                  color: "#B45309",
                  fontWeight: "600",
                }}
              >
                <th>Employee</th>
                <th>Email</th>
                <th>Phone</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                          width: "45px",
                          height: "45px",
                          background: "#FDE68A",
                          color: "#B45309",
                          fontWeight: "bold",
                          fontSize: "18px",
                          border: "2px solid #F59E0B",
                        }}
                      >
                        {emp.firstName.charAt(0)}
                      </div>
                      <div>
                        <span className="fw-semibold">
                          {emp.firstName} {emp.lastName}
                        </span>
                        <br />
                        <small className="text-muted">ID: {emp.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>

                  <td className="text-center">
                    <button
                      className="btn btn-sm me-2"
                      onClick={() => navigate(`/edit-employee/${emp.id}`)}
                      style={{
                        background: "linear-gradient(90deg, #D97706, #F59E0B)",
                        color: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(217,119,6,0.4)",
                      }}
                    >
                      <FaEdit className="me-1" /> Edit
                    </button>

                    <button
                      className="btn btn-sm"
                      onClick={() => openDeleteModal(emp.id)}
                      style={{
                        background: "linear-gradient(90deg, #DC2626, #EF4444)",
                        color: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(239,68,68,0.4)",
                      }}
                    >
                      <FaTrash className="me-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
};

export default ListEmployee;
