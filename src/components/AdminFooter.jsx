import React from "react";
import { FaShieldAlt, FaHeart } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-left">
          <FaShieldAlt className="icon" />
          <span>EMS Admin Panel</span>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          © {new Date().getFullYear()} Employee Management System
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          Built with <FaHeart className="heart" /> by Admin Team
        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        .admin-footer {
          background: #0f0f0f;
          border-top: 1px solid #1f1f1f;
          padding: 16px 0;
        }

        .footer-container {
          max-width: 1200px;
          height:50px;
          margin: auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #bbb;
          font-size: 0.85rem;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: #f2c38b;
        }

        .footer-left .icon {
          font-size: 1rem;
        }

        .footer-center {
          text-align: center;
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .heart {
          color: #dc2626;
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default AdminFooter;
