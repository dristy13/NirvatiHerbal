import React from "react";

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
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}
      >
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p style={{ color: "#6b7280", fontStyle: "italic" }}>
          Your cart is empty.{" "}
          <a href="#products" style={{ color: "#16a34a" }}>
            Shop Now
          </a>
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "120px", borderRadius: "8px" }}
              />

              {/* Item Info */}
              <div style={{ flex: "1", minWidth: "200px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
                  {item.title}
                </h2>
                <p style={{ color: "#6b7280" }}>₹ {item.price}</p>
                <p style={{ color: "#16a34a", fontWeight: "600" }}>
                  Subtotal: ₹ {item.price * item.quantity}
                </p>
              </div>

              {/* Quantity */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <button
                  onClick={() => handleQuantityChange(item.id, "dec")}
                  aria-label="Decrease quantity"
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, "inc")}
                  aria-label="Increase quantity"
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total & Checkout */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "24px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
              Total: ₹ {calculateTotal()}
            </h2>
            <button
              style={{
                background: "linear-gradient(to right, #16a34a, #4ade80)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
