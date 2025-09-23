// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={container}>
        {/* Company Info */}
        <div style={section}>
          <h3 style={sectionTitle}>Nirvati Herbal</h3>
          <p style={text}>
            Premium herbal products for your health and wellness. 100% natural,
            organic, and crafted with care.
          </p>
          <p style={text}>123 Herbal Street, Wellness City, India</p>
          <p style={text}>Email: info@nirvatiherbal.com</p>
          <p style={text}>Phone: +91 98765 43210</p>
        </div>

        {/* Quick Links */}
        <div style={section}>
          <h4 style={sectionTitleSmall}>Quick Links</h4>
          <ul style={list}>
            {["Home", "Products", "About Us", "Contact", "Blog"].map(
              (link, i) => (
                <li key={i} style={listItem}>
                  {link}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support Links */}
        <div style={section}>
          <h4 style={sectionTitleSmall}>Support</h4>
          <ul style={list}>
            {[
              "FAQs",
              "Shipping & Returns",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((link, i) => (
              <li key={i} style={listItem}>
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div style={section}>
          <h4 style={sectionTitleSmall}>Follow Us</h4>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            {["FB", "IG", "TW", "YT"].map((icon, i) => (
              <span key={i} style={socialIcon}>
                {icon}
              </span>
            ))}
          </div>
          <h4 style={sectionTitleSmall}>Newsletter</h4>
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="Your email" style={input} />
            <button style={subscribeBtn}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div style={bottom}>
        &copy; {new Date().getFullYear()} Nirvati Herbal. All rights reserved.
      </div>
    </footer>
  );
};

// --- Styles ---
const footerStyle = {
  backgroundColor: "#111827",
  color: "#fff",
  padding: "40px 20px",
  marginTop: 40,
};
const container = {
  display: "flex",
  flexWrap: "wrap",
  gap: 24,
  maxWidth: 1200,
  margin: "0 auto",
  justifyContent: "space-between",
};
const section = { flex: "1 1 220px" };
const sectionTitle = { marginBottom: 12, fontSize: 18, fontWeight: 600 };
const sectionTitleSmall = { marginBottom: 8, fontSize: 16, fontWeight: 500 };
const text = {
  fontSize: 14,
  color: "#9ca3af",
  lineHeight: 1.6,
  marginBottom: 6,
};
const list = { listStyle: "none", padding: 0, margin: 0 };
const listItem = {
  marginBottom: 6,
  fontSize: 14,
  cursor: "pointer",
  color: "#9ca3af",
  transition: "color 0.2s",
};
const socialIcon = {
  display: "inline-block",
  width: 28,
  height: 28,
  backgroundColor: "#374151",
  borderRadius: "50%",
  color: "#fff",
  textAlign: "center",
  lineHeight: "28px",
  fontSize: 12,
  cursor: "pointer",
};
const input = {
  flex: 1,
  padding: 8,
  borderRadius: 6,
  border: "1px solid #374151",
  outline: "none",
};
const subscribeBtn = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  backgroundColor: "#0b74ff",
  color: "#fff",
  cursor: "pointer",
};
const bottom = {
  textAlign: "center",
  marginTop: 24,
  fontSize: 13,
  color: "#9ca3af",
};

export default Footer;
