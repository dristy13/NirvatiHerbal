import React, { useState } from "react";
import "../CSS/Products.css";

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
    <div className="products-container">
      <h1 className="products-title">Products</h1>

      {/* Filters */}
      <div className="products-filters">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
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
          className="filter-select"
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
          className="filter-select"
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
      <div className="products-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} className="product-image" />
            <h2 className="product-name">{p.name}</h2>
            <p className="product-brand">{p.brand}</p>
            <p className="product-price">₹{p.price.toLocaleString("en-IN")}</p>
            <p className="product-rating">Rating: {p.rating}⭐</p>
            <div className="product-buttons">
              <button onClick={() => addToCart(p)} className="add-cart-btn">
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(p.id)}
                className={`wishlist-btn ${
                  wishlist.includes(p.id) ? "wishlist-active" : ""
                }`}
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
