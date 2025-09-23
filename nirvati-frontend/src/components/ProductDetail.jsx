import React, { useState } from "react";

const ProductDetail = ({
  product,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const itemExists = cartItems.find((item) => item.id === product.id);
    if (itemExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const toggleWishlist = () => {
    if (wishlist.find((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        {/* Product Images */}
        <div
          style={{
            flex: "1 1 400px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            transition: "transform 0.3s",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              display: "block",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        {/* Product Info */}
        <div
          style={{
            flex: "1 1 400px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h1 style={{ fontSize: "30px", fontWeight: "700", color: "#1f2937" }}>
            {product.title}
          </h1>

          <p style={{ color: "#6b7280", fontSize: "16px" }}>
            {product.description}
          </p>

          <p style={{ fontSize: "24px", fontWeight: "700", color: "#16a34a" }}>
            ₹ {product.price}
          </p>

          {/* Rating */}
          <div>
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <span key={i} style={{ color: "#fbbf24", fontSize: "18px" }}>
                ⭐
              </span>
            ))}
          </div>

          {/* Quantity Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              style={{
                padding: "6px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              style={{
                padding: "6px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={handleAddToCart}
              style={{
                background: "linear-gradient(to right, #16a34a, #4ade80)",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              style={{
                background: wishlist.find((item) => item.id === product.id)
                  ? "#f87171"
                  : "#e5e7eb",
                color: wishlist.find((item) => item.id === product.id)
                  ? "#fff"
                  : "#1f2937",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {wishlist.find((item) => item.id === product.id)
                ? "❤️ Remove from Wishlist"
                : "🤍 Add to Wishlist"}
            </button>
          </div>

          {/* Product Meta */}
          <div style={{ color: "#9ca3af", fontSize: "14px", marginTop: "8px" }}>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: "40px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Customer Reviews
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e5e7eb",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                marginBottom: "16px",
              }}
            >
              <p style={{ fontWeight: 600 }}>{review.name}</p>
              <div>
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24" }}>
                    ⭐
                  </span>
                ))}
              </div>
              <p style={{ color: "#6b7280" }}>{review.text}</p>
            </div>
          ))
        ) : (
          <p style={{ fontStyle: "italic", color: "#6b7280" }}>
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
