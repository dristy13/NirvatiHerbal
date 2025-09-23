import React from "react";

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
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        background: "#16a34a",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
        onClick={() => setActiveSection("home")}
      >
        Nirvati Herbal
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {navItems.map((section) => (
          <button
            key={section}
            onClick={() =>
              section === "cart"
                ? setActiveSection("cart")
                : section === "account"
                ? setActiveSection("account")
                : setActiveSection(section)
            }
            style={{
              background: "transparent",
              border: "none",
              color: activeSection === section ? "#ffed4a" : "#fff",
              cursor: "pointer",
              fontWeight: activeSection === section ? 600 : 500,
              position: section === "cart" ? "relative" : "static",
              fontSize: "1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff200")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color =
                activeSection === section ? "#ffed4a" : "#fff")
            }
          >
            {section === "cart" ? (
              <>
                Cart
                {cartItems.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-12px",
                      background: "#f59e0b",
                      color: "#fff",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {cartItems.length}
                  </span>
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
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            background: "#fff",
            color: "#16a34a",
            border: "none",
            padding: "8px 16px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e0ffe0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
          }}
        >
          Chat
        </button>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: "none", // Will add media query later
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: "1.5rem",
        }}
      >
        ☰
      </button>
    </header>
  );
};

export default Header;
