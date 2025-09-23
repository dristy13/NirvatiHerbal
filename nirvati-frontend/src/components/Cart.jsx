import React from "react";

const Cart = ({ cartItems, setCartItems, setActiveSection, setIsChatOpen }) => {
  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Change quantity
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

  // Calculate total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button
          onClick={() => setActiveSection("products")}
          style={{
            marginTop: "16px",
            padding: "12px 24px",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px" }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}
      >
        Shopping Cart
      </h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginBottom: "24px",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "16px",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "120px", borderRadius: "12px", objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
              {item.name}
            </h2>
            <p style={{ color: "#6b7280", margin: "4px 0" }}>{item.category}</p>
            <p
              style={{ fontSize: "16px", fontWeight: "600", color: "#16a34a" }}
            >
              ₹{item.price.toLocaleString("en-IN")}
            </p>

            {/* Quantity Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              <button
                onClick={() => updateQuantity(item.id, "dec")}
                style={{
                  padding: "4px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, "inc")}
                style={{
                  padding: "4px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            style={{
              padding: "8px 12px",
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Total */}
      <div
        style={{
          textAlign: "right",
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "24px",
        }}
      >
        Total: ₹{totalPrice.toLocaleString("en-IN")}
      </div>

      {/* Checkout & Chat */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveSection("checkout")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Proceed to Checkout
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          style={{
            padding: "12px 24px",
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
    </div>
  );
};

export default Cart;
