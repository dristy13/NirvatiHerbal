import React from "react";
import "../CSS/Cart.css";

const Cart = ({ cartItems, setCartItems, setActiveSection, setIsChatOpen }) => {
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, type) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : item.quantity - 1 > 0
                ? item.quantity - 1
                : 1,
          };
        }
        return item;
      })
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => setActiveSection("products")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="cart-item-info">
            <h2>{item.name}</h2>
            <p>{item.category}</p>
            <p className="price">₹{item.price.toLocaleString("en-IN")}</p>

            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, "dec")}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
            </div>
          </div>
          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        Total: ₹{totalPrice.toLocaleString("en-IN")}
      </div>

      <div className="cart-actions">
        <button
          className="checkout-btn"
          onClick={() => setActiveSection("checkout")}
        >
          Proceed to Checkout
        </button>
        <button className="chat-btn" onClick={() => setIsChatOpen(true)}>
          Consult Expert
        </button>
      </div>
    </div>
  );
};

export default Cart;
