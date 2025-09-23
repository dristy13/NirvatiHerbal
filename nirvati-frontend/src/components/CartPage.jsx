import React from "react";
import "../CSS/CartPage.css";

const CartPage = ({ cartItems, setCartItems }) => {
  const handleQuantityChange = (id, action) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="cart-empty">
          Your cart is empty. <a href="#products">Shop Now</a>
        </p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-item-info">
                <h2>{item.title}</h2>
                <p>₹ {item.price}</p>
                <p className="subtotal">
                  Subtotal: ₹ {item.price * item.quantity}
                </p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, "dec")}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, "inc")}>
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-footer">
            <h2>Total: ₹ {calculateTotal()}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
