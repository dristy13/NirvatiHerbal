import React, { useState } from "react";
import "../CSS/ProductList.css";

const ProductList = ({ setActiveSection, setIsChatOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    category: "All",
    price: "All",
    rating: "All",
  });
  const [wishlist, setWishlist] = useState([]);

  const products = [
    {
      id: 1,
      name: "Herbal Tea",
      category: "Tea",
      price: 250,
      rating: 4,
      image:
        "https://weherbal.in/cdn/shop/files/herbal-tea-607337.webp?v=1756148332&width=2048",
    },
    {
      id: 2,
      name: "Aloe Vera Gel",
      category: "Skincare",
      price: 350,
      rating: 4,
      image:
        "https://avimeeherbal.com/cdn/shop/files/frantimage_b71fe5ff-bb30-4e66-80e7-53e0177d088f.png?v=1708752599&width=1024",
    },
    {
      id: 3,
      name: "Turmeric Powder",
      category: "Spices",
      price: 150,
      rating: 5,
      image:
        "https://sheshaayurveda.com/cdn/shop/files/shesha_ayurveda_musk_turmeric_OR_white_kasturi_manjal.jpg?v=1747207234",
    },
    {
      id: 4,
      name: "Neem Oil",
      category: "Oil",
      price: 400,
      rating: 4,
      image:
        "https://m.media-amazon.com/images/I/41ompXRis6L._UF1000,1000_QL80_.jpg",
    },
    {
      id: 5,
      name: "Ashwagandha Capsules",
      category: "Supplements",
      price: 500,
      rating: 5,
      image:
        "https://m.media-amazon.com/images/I/41ompXRis6L._UF1000,1000_QL80_.jpg",
    },
    {
      id: 6,
      name: "Tulsi Drops",
      category: "Herbal",
      price: 200,
      rating: 4,
      image:
        "https://www.jiomart.com/images/product/original/rv7ua8qkgf/myupchar-ayurveda-tulsi-drops-product-images-orv7ua8qkgf-p609441419-0-202406241718.jpg?im=Resize=(420,420)",
    },
    {
      id: 7,
      name: "Triphala Powder",
      category: "Supplements",
      price: 300,
      rating: 5,
      image:
        "https://cdn01.pharmeasy.in/dam/products_otc/F09738/al-ayurvedic-life-organic-triphala-powder-200-gms-pack-of-5-2-1753501940.jpg",
    },
    {
      id: 8,
      name: "Herbal Face Pack",
      category: "Skincare",
      price: 350,
      rating: 4,
      image:
        "https://m.media-amazon.com/images/I/6150ZylfE6L._UF1000,1000_QL80_.jpg",
    },
  ];

  const handleWishlist = (id) => {
    if (wishlist.includes(id))
      setWishlist(wishlist.filter((pid) => pid !== id));
    else setWishlist([...wishlist, id]);
  };

  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter.category === "All" || p.category === filter.category) &&
      (filter.rating === "All" ||
        Math.floor(p.rating) === Number(filter.rating)) &&
      (filter.price === "All" ||
        (filter.price === "0-200" && p.price <= 200) ||
        (filter.price === "201-400" && p.price > 200 && p.price <= 400) ||
        (filter.price === "401+" && p.price > 400))
    );
  });

  return (
    <section style={{ padding: "40px 20px", fontFamily: "Arial, sans-serif" }}>
      <h2
        style={{ textAlign: "center", marginBottom: "32px", fontSize: "2rem" }}
      >
        Our Products
      </h2>

      {/* Search & Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            flex: "1 1 100%",
            minWidth: "150px",
          }}
        />

        {["category", "price", "rating"].map((f) => (
          <select
            key={f}
            value={filter[f]}
            onChange={(e) => setFilter({ ...filter, [f]: e.target.value })}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              flex: "1 1 120px",
            }}
          >
            {f === "category" && (
              <>
                <option value="All">All Categories</option>
                <option value="Tea">Tea</option>
                <option value="Skincare">Skincare</option>
                <option value="Spices">Spices</option>
                <option value="Oil">Oil</option>
                <option value="Supplements">Supplements</option>
                <option value="Herbal">Herbal</option>
              </>
            )}
            {f === "price" && (
              <>
                <option value="All">All Prices</option>
                <option value="0-200">0 - 200 INR</option>
                <option value="201-400">201 - 400 INR</option>
                <option value="401+">401+ INR</option>
              </>
            )}
            {f === "rating" && (
              <>
                <option value="All">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </>
            )}
          </select>
        ))}
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: "center", gridColumn: "1/-1" }}>
            <img
              src="https://via.placeholder.com/150?text=No+Products"
              alt="no products"
              style={{ marginBottom: "12px" }}
            />
            <p>No products found.</p>
          </div>
        )}

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.05)";
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                }}
              />
              <button
                onClick={() => handleWishlist(product.id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  border: "none",
                  background: wishlist.includes(product.id)
                    ? "#ef4444"
                    : "#e5e7eb",
                  color: wishlist.includes(product.id) ? "#fff" : "#000",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                ❤️
              </button>
            </div>

            <div style={{ padding: "16px", textAlign: "center" }}>
              <h3 style={{ marginBottom: "8px" }}>{product.name}</h3>
              <p
                style={{
                  color: "#555",
                  fontSize: "0.95rem",
                  marginBottom: "4px",
                }}
              >
                Category: {product.category}
              </p>
              <p
                style={{
                  color: "#16a34a",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                Price: ₹{product.price.toLocaleString("en-IN")}
              </p>
              <p style={{ color: "#f59e0b", marginBottom: "12px" }}>
                {"⭐".repeat(product.rating)}
              </p>
              <button
                style={{
                  background: "linear-gradient(to right, #16a34a, #4ade80)",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Explore Products →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
