import React, { useState } from "react";
import "../CSS/Checkout.css";

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
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!name || !email || !phone || !address) {
      alert("Please fill all details!");
      return;
    }
    alert(
      `Order placed successfully!\nPayment Method: ${paymentMethod.toUpperCase()}`
    );
    setCartItems([]);
    setActiveSection("home");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Shipping Details */}
      <div className="shipping-details">
        <h2>Shipping Details</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="order-summary-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))
        )}
        <div className="order-summary-total">
          <span>Total:</span>
          <span>₹{totalPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="payment-method">
        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          COD
        </label>
        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />
          UPI / Payment API
        </label>
      </div>

      {/* Buttons */}
      <button className="checkout-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
      <button className="consult-btn" onClick={() => setIsChatOpen(true)}>
        Consult Expert
      </button>
    </div>
  );
};

export default Checkout;
