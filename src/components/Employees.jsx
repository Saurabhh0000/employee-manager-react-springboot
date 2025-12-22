import React, { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Employees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    listEmployees().then((res) => setEmployees(res.data));
  }, []);

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.employeeId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ================= WORKING HOURS ================= */
  const calculateWorkingHours = (punchIn, punchOut) => {
    if (!punchIn || !punchOut) return "—";
    const diff = new Date(punchOut) - new Date(punchIn);
    if (diff <= 0) return "—";
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `${h}h ${m}m`;
  };

  return (
    <div className="container my-5">
      {/* ===== HEADER ROW ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Employee Attendance Overview</h2>

        {/* BACK BUTTON */}
        <button
          className="btn btn-outline-dark d-flex align-items-center gap-2"
          style={{ borderRadius: 30, padding: "8px 18px" }}
          onClick={() => navigate("/dashboard")}>
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        className="form-control mb-4 shadow-sm"
        placeholder="Search by name, email, employee ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ borderRadius: 30, padding: 12 }}
      />

      {/* TABLE */}
      <div className="table-responsive">
        <table
          className="table align-middle shadow-lg"
          style={{ borderRadius: 16, overflow: "hidden" }}>
          <thead>
            <tr
              style={{
                background: "linear-gradient(90deg,#6a5af9,#c048ff)",
                color: "#fff",
                fontSize: "0.95rem",
              }}>
              <th>#</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Working Hours</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((emp, index) => (
              <tr
                key={emp.id}
                style={{ background: "#fafaff" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f3f4ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#fafaff")
                }>
                <td className="fw-bold">{index + 1}</td>

                <td>
                  <span
                    style={{
                      background: "#eef2ff",
                      color: "#4338ca",
                      padding: "4px 12px",
                      borderRadius: 999,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}>
                    {emp.employeeId}
                  </span>
                </td>

                <td className="fw-semibold">
                  {emp.firstName} {emp.lastName}
                </td>

                <td className="text-muted">{emp.email}</td>
                <td>{emp.phoneNumber}</td>

                <td className="fw-bold text-success">
                  {formatDate(emp.punchIn)}
                </td>

                <td className="fw-bold text-danger">
                  {formatDate(emp.punchOut)}
                </td>
                <td className="fw-bold hours">
                  {calculateWorkingHours(emp.punchIn, emp.punchOut)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
