import React, { useState } from "react";

const Checkout = ({
  cartItems,
  setCartItems,
  setActiveSection,
  setIsChatOpen,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // COD by default

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!name || !email || !phone || !address) {
      alert("Please fill all details!");
      return;
    }
    alert("Order placed successfully!");
    setCartItems([]); // clear cart
    setActiveSection("home"); // redirect to home
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px" }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}
      >
        Checkout
      </h1>

      {/* Shipping Details */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Shipping Details
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            minHeight: "80px",
          }}
        />
      </div>

      {/* Order Summary */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Order Summary
        </h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "8px",
            }}
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "600",
            fontSize: "18px",
            marginTop: "12px",
          }}
        >
          <span>Total:</span>
          <span>₹{totalPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Payment Options */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Payment Method
        </h2>
        <div style={{ display: "flex", gap: "16px" }}>
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />{" "}
            COD
          </label>
          <label>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />{" "}
            UPI / Payment API
          </label>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        style={{
          padding: "12px 24px",
          backgroundColor: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
      <button
        onClick={() => setIsChatOpen(true)}
        style={{
          padding: "12px 24px",
          marginLeft: "16px",
          backgroundColor: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Consult Expert
      </button>
    </div>
  );
};

export default Checkout;
