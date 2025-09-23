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
import Footer from "./components/Footer";

import "./NirvatiHerbal.css";

const NirvatiHerbal = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const addToCart = (product, qty = 1) => {
    if (!product?.id) return;
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing)
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
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

  const removeFromCart = (productId) =>
    setCartItems((prev) => prev.filter((item) => item.id !== productId));

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

  const navigateTo = (section, opts = {}) => {
    if (opts.product) setSelectedProduct(opts.product);
    setActiveSection(section);
    window.scrollTo(0, 0);
  };

  return (
    <div className="nirvati-app">
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
          setActiveSection={navigateTo}
          setIsChatOpen={setIsChatOpen}
          products={sampleProducts}
        />
      )}
      {activeSection === "test" && (
        <TestSection
          setActiveSection={navigateTo}
          setIsChatOpen={setIsChatOpen}
        />
      )}
      {activeSection === "products" && (
        <Products
          products={sampleProducts}
          setActiveSection={navigateTo}
          addToCart={addToCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}
      {activeSection === "productlist" && (
        <ProductList
          products={sampleProducts}
          setActiveSection={navigateTo}
          addToCart={addToCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
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
          setActiveSection={navigateTo}
          setIsChatOpen={setIsChatOpen}
        />
      )}
      {activeSection === "cart" && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          removeItem={removeFromCart}
          updateQuantity={setCartItemQuantity}
          setActiveSection={navigateTo}
          setIsChatOpen={setIsChatOpen}
        />
      )}
      {activeSection === "cartpage" && (
        <CartPage
          cartItems={cartItems}
          setCartItems={setCartItems}
          removeFromCart={removeFromCart}
          setActiveSection={navigateTo}
        />
      )}
      {activeSection === "checkout" && (
        <Checkout
          cartItems={cartItems}
          setCartItems={setCartItems}
          setActiveSection={navigateTo}
        />
      )}
      {activeSection === "checkoutpage" && (
        <CheckoutPage
          cartItems={cartItems}
          setCartItems={setCartItems}
          setActiveSection={navigateTo}
        />
      )}
      {activeSection === "account" && (
        <UserAccount
          wishlist={wishlist}
          setWishlist={setWishlist}
          setActiveSection={navigateTo}
        />
      )}

      {isChatOpen && (
        <div className="chat-overlay" onClick={() => setIsChatOpen(false)}>
          <div className="chat-box" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <div>
                <div className="chat-title">Ayurvedic Expert</div>
                <div className="chat-status">Online now</div>
              </div>
              <button onClick={() => setIsChatOpen(false)}>✕</button>
            </div>
            <div className="chat-body">
              <div className="chat-message">
                Hello! How can we help you today?
              </div>
            </div>
            <div className="chat-footer">
              <input placeholder="Type your message..." />
              <button>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Footer only for Cart/Checkout and when Chat is not open */}
      {(activeSection === "cart" ||
        activeSection === "cartpage" ||
        activeSection === "checkout" ||
        activeSection === "checkoutpage") &&
        !isChatOpen && <Footer className="sticky-footer" />}

      {/* Regular Footer for other pages */}
      {!(
        activeSection === "cart" ||
        activeSection === "cartpage" ||
        activeSection === "checkout" ||
        activeSection === "checkoutpage"
      ) && <Footer />}
    </div>
  );
};

export default NirvatiHerbal;
