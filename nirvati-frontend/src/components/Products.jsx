import React, { useState } from "react";

const Products = ({ products, setActiveSection, cartItems, setCartItems }) => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterRating, setFilterRating] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const brands = ["All", ...new Set(products.map((p) => p.brand))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || p.category === filterCategory;
    const matchesBrand = filterBrand === "All" || p.brand === filterBrand;
    const matchesRating =
      filterRating === "All" || Math.floor(p.rating) === Number(filterRating);
    return matchesSearch && matchesCategory && matchesBrand && matchesRating;
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}
      >
        Products
      </h1>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
            flex: "1 1 200px",
          }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
          }}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
          }}
        >
          <option value="All">All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}⭐
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              {p.name}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              {p.brand}
            </p>
            <p style={{ fontWeight: "600", marginBottom: "8px" }}>
              ₹{p.price.toLocaleString("en-IN")}
            </p>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              Rating: {p.rating}⭐
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => addToCart(p)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  backgroundColor: "#16a34a",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(p.id)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: wishlist.includes(p.id) ? "#fbbf24" : "#fff",
                  cursor: "pointer",
                }}
              >
                {wishlist.includes(p.id) ? "★" : "☆"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
