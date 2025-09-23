import React, { useState } from "react";

// Components
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import TestSection from "./components/TestSection";
import Products from "./components/Products";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";
import CheckoutPage from "./components/CheckoutPage";
import UserAccount from "./components/UserAccount";

// ---------------- Footer Component ----------------
const Footer = () => {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s",
  };

  return (
    <footer
      style={{
        backgroundColor: "#16A34A",
        color: "#fff",
        padding: "25px 20px",
        marginTop: "auto",
        fontSize: 14,
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20,
        }}
      >
        <div>
          <h3 style={{ marginBottom: 12 }}>About Nirvati</h3>
          <p>
            Nirvati Herbal provides natural and organic herbal products for a
            healthier lifestyle. Pure, safe, and effective.
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: 12 }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["Home", "Products", "Cart", "Checkout", "Account"].map(
              (item, idx) => (
                <li
                  key={idx}
                  style={{ marginBottom: 6 }}
                  onMouseEnter={(e) => (e.target.style.color = "#16a34a")}
                  onMouseLeave={(e) => (e.target.style.color = "#fff")}
                >
                  <span style={linkStyle}>{item}</span>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: 12 }}>Contact Us</h3>
          <p>Email: support@nirvati.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: 123 Herbal St, Wellness City</p>
        </div>

        <div>
          <h3 style={{ marginBottom: 12 }}>Follow Us</h3>
          <p style={{ margin: 0 }}>Facebook | Instagram | Twitter | LinkedIn</p>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 15,
          fontSize: 12,
          opacity: 0.6,
        }}
      >
        © 2025 Nirvati Herbal. All Rights Reserved.
      </div>
    </footer>
  );
};

// ---------------- Main App ----------------
const NirvatiHerbal = () => {
  // ---------- Global UI State ----------
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // ---------- Global App Data ----------
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ---------- Sample Products ----------
  const sampleProducts = [
    {
      id: 1,
      name: "Herbal Tea",
      image: "https://via.placeholder.com/400x300",
      price: 250,
      category: "Tea",
      brand: "Nirvati",
      rating: 4,
      description: "Soothing herbal tea.",
      reviews: [],
    },
    {
      id: 2,
      name: "Aloe Vera Gel",
      image: "https://via.placeholder.com/400x300",
      price: 350,
      category: "Skincare",
      brand: "Nirvati",
      rating: 4,
      description: "Natural Aloe Vera Gel.",
      reviews: [],
    },
    {
      id: 3,
      name: "Turmeric Powder",
      image: "https://via.placeholder.com/400x300",
      price: 150,
      category: "Spices",
      brand: "Nirvati",
      rating: 5,
      description: "Organic turmeric.",
      reviews: [],
    },
    {
      id: 4,
      name: "Neem Oil",
      image: "https://via.placeholder.com/400x300",
      price: 400,
      category: "Oil",
      brand: "Nirvati",
      rating: 4,
      description: "Cold-pressed neem oil.",
      reviews: [],
    },
  ];

  // ---------- Cart Helpers ----------
  const addToCart = (product, qty = 1) => {
    if (!product?.id) return;
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setActiveSection("cart");
  };

  const setCartItemQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // ---------- Wishlist ----------
  const toggleWishlist = (product) => {
    if (!product?.id) return;
    const exists = wishlist.find((w) =>
      typeof w === "object" ? w.id === product.id : w === product.id
    );
    if (exists) {
      setWishlist((prev) =>
        prev.filter((w) =>
          typeof w === "object" ? w.id !== product.id : w !== product.id
        )
      );
    } else {
      setWishlist((prev) => [...prev, product]);
    }
  };

  // ---------- Navigation Helper ----------
  const navigateTo = (section, opts = {}) => {
    if (opts.product) setSelectedProduct(opts.product);
    setActiveSection(section);
    window.scrollTo(0, 0);
  };

  // ---------- Render ----------
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Header
        activeSection={activeSection}
        setActiveSection={navigateTo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />

      {activeSection === "home" && (
        <HomeSection
          setActiveSection={(s, opts) => navigateTo(s, opts)}
          setIsChatOpen={setIsChatOpen}
          products={sampleProducts}
        />
      )}

      {activeSection === "test" && (
        <TestSection
          setActiveSection={(s, opts) => navigateTo(s, opts)}
          setIsChatOpen={setIsChatOpen}
        />
      )}

      {activeSection === "products" && (
        <Products
          products={sampleProducts}
          setActiveSection={(s, opts) => navigateTo(s, opts)}
          cartItems={cartItems}
          setCartItems={setCartItems}
          addToCart={addToCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {activeSection === "productlist" && (
        <ProductList
          products={sampleProducts}
          setActiveSection={(s, opts) => navigateTo(s, opts)}
          addToCart={addToCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
          setSelectedProduct={setSelectedProduct}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}

      {activeSection === "productdetail" && (
        <ProductDetail
          product={selectedProduct}
          cartItems={cartItems}
          setCartItems={setCartItems}
          wishlist={wishlist}
          setWishlist={setWishlist}
          setActiveSection={(s) => navigateTo(s)}
          setIsChatOpen={setIsChatOpen}
        />
      )}

      {activeSection === "cart" && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          setActiveSection={(s) => navigateTo(s)}
          setIsChatOpen={setIsChatOpen}
          removeItem={removeFromCart}
          updateQuantity={setCartItemQuantity}
        />
      )}

      {activeSection === "cartpage" && (
        <CartPage
          cartItems={cartItems}
          setCartItems={setCartItems}
          removeFromCart={removeFromCart}
          setActiveSection={(s) => navigateTo(s)}
        />
      )}

      {activeSection === "checkout" && (
        <Checkout
          cartItems={cartItems}
          setCartItems={setCartItems}
          setActiveSection={(s) => navigateTo(s)}
        />
      )}

      {activeSection === "checkoutpage" && (
        <CheckoutPage
          cartItems={cartItems}
          setCartItems={setCartItems}
          setActiveSection={(s) => navigateTo(s)}
        />
      )}

      {activeSection === "account" && (
        <UserAccount
          wishlist={wishlist}
          setWishlist={setWishlist}
          setActiveSection={(s) => navigateTo(s)}
        />
      )}

      {/* Fallback Chat Overlay */}
      {isChatOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setIsChatOpen(false)}
        >
          <div
            style={{
              width: 380,
              maxWidth: "100%",
              height: 560,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: 16,
                background: "linear-gradient(135deg,#16a34a,#059669)",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>Ayurvedic Expert</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>Online now</div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: 18,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, padding: 12, overflowY: "auto" }}>
              <div style={{ marginBottom: 12, color: "#374151" }}>
                Hello! How can we help you today?
              </div>
            </div>

            <div style={{ padding: 12, borderTop: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <button
                  style={{
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 12px",
                    cursor: "pointer",
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Footer ---------------- */}
      <Footer />
    </div>
  );
};

export default NirvatiHerbal;
