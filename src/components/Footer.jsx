import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#000",
        color: "#fff",
        padding: "18px 0",
        borderTop: "2px solid #222",
        marginTop: "40px",
        textAlign: "center",
        width: "100%",
      }}
    >
      <div className="container">

        {/* Center Text */}
        <p style={{ margin: 0, opacity: 0.85, fontSize: "0.95rem" }}>
          © {new Date().getFullYear()} <strong>Employee Manager</strong>. All Rights Reserved.
        </p>

        <p style={{ margin: 0, opacity: 0.65, fontSize: "0.85rem" }}>
          Designed with ❤️ for seamless employee management.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
