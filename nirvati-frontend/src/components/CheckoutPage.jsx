import React from "react";
import "../CSS/CheckoutPage.css";

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

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* Shipping Info */}
      <div className="shipping-info">
        <h2>Shipping Information</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {["name", "email", "phone", "address", "city", "pincode"].map(
            (field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={shippingInfo[field]}
                onChange={handleChange}
              />
            )
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="payment-method">
        {["cod", "online"].map((method) => (
          <label
            key={method}
            className={paymentMethod === method ? "selected" : ""}
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

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="order-summary-item">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>₹ {item.price * item.quantity}</span>
          </div>
        ))}
        <div className="order-summary-total">
          <span>Total</span>
          <span>₹ {calculateTotal()}</span>
        </div>
      </div>

      {/* Place Order */}
      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
