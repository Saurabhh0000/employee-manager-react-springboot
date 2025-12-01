import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        background: "linear-gradient(180deg, #FBBF24, #D97706)",
        color: "#4B3600",
        textShadow: "0 1px 2px rgba(255,255,255,0.5)",
        boxShadow: "0 -4px 16px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container text-center">

        <h4 className="fw-bold mb-2">Employee Manager</h4>
        <p className="mb-4">Premium Gold UI with React + Bootstrap</p>

        {/* Social Icons */}
        <div className="d-flex gap-4 justify-content-center mb-3">
          {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, id) => (
            <div
              key={id}
              style={{
                background: "#fff",
                width: "42px",
                height: "42px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                boxShadow: "0 0 12px rgba(217,119,6,0.6)",
                cursor: "pointer",
              }}
            >
              <Icon color="#B45309" size={18} />
            </div>
          ))}
        </div>

        <p className="mt-3">
          © {new Date().getFullYear()} Employee Manager — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
