import React from "react";
import "../CSS/Header.css";

const Header = ({
  activeSection,
  setActiveSection,
  isMenuOpen,
  setIsMenuOpen,
  isChatOpen,
  setIsChatOpen,
  cartItems = [],
}) => {
  const navItems = ["home", "products", "test", "account", "cart"];

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo" onClick={() => setActiveSection("home")}>
        Nirvati Herbal
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        {navItems.map((section) => (
          <button
            key={section}
            className={`nav-item ${activeSection === section ? "active" : ""}`}
            onClick={() =>
              section === "cart"
                ? setActiveSection("cart")
                : section === "account"
                ? setActiveSection("account")
                : setActiveSection(section)
            }
          >
            {section === "cart" ? (
              <>
                Cart
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </>
            ) : section === "account" ? (
              "My Account"
            ) : (
              section.charAt(0).toUpperCase() + section.slice(1)
            )}
          </button>
        ))}

        {/* Chat Button */}
        <button className="chat-btn" onClick={() => setIsChatOpen(!isChatOpen)}>
          Chat
        </button>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
    </header>
  );
};

export default Header;
