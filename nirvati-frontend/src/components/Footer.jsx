import React from "react";
import "../CSS/Footer.css";

const Footer = () => {
  const quickLinks = ["Home", "Products", "Cart", "Checkout", "Account"];
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>About Nirvati</h3>
          <p>
            Nirvati Herbal provides natural and organic herbal products for a
            healthier lifestyle. Pure, safe, and effective.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((item, idx) => (
              <li key={idx}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>Email: support@nirvati.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: 123 Herbal St, Wellness City</p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <p>Facebook | Instagram | Twitter | LinkedIn</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Nirvati Herbal. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
