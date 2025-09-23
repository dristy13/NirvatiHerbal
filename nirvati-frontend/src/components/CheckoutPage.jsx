import React, { useState } from "react";

const CheckoutPage = ({ cartItems, setCartItems }) => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    setCartItems([]);
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    width: "100%",
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}
      >
        Checkout
      </h1>

      {/* Shipping Info */}
      <div
        style={{
          marginBottom: "32px",
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Shipping Information
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={shippingInfo.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={shippingInfo.pincode}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Payment Method */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Payment Method
        </h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {["cod", "online"].map((method) => (
            <label
              key={method}
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border:
                  paymentMethod === method
                    ? "2px solid #16a34a"
                    : "1px solid #d1d5db",
                backgroundColor:
                  paymentMethod === method ? "#dcfce7" : "#f9fafb",
                cursor: "pointer",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method === "cod" ? "Cash on Delivery" : "Online Payment"}
            </label>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div
        style={{
          marginBottom: "32px",
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
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
            }}
          >
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>₹ {item.price * item.quantity}</span>
          </div>
        ))}
        <div
          style={{
            fontWeight: "600",
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Total</span>
          <span>₹ {calculateTotal()}</span>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        style={{
          background: "linear-gradient(to right, #16a34a, #4ade80)",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
