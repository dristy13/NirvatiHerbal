// src/components/UserAccount.jsx
import React, { useEffect, useState } from "react";

const UserAccount = ({
  setActiveSection,
  wishlist = [],
  setWishlist,
  cartItems = [],
  setCartItems,
}) => {
  const sampleOrders = [
    {
      id: "ORD-20250920-1",
      date: "2025-09-20",
      status: "Delivered",
      total: 750,
      items: [
        { id: 1, name: "Herbal Tea", qty: 2, price: 250 },
        { id: 3, name: "Turmeric Powder", qty: 1, price: 150 },
      ],
      docs: [],
      problems: [],
      courier: { name: "FastCourier", trackingId: "TRK123456" },
    },
  ];

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("nirvati_user")) || null
  );
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("nirvati_orders")) || sampleOrders
  );
  const [userDocs, setUserDocs] = useState(
    JSON.parse(localStorage.getItem("nirvati_user_docs")) || []
  );
  const [companyDocs, setCompanyDocs] = useState(
    JSON.parse(localStorage.getItem("nirvati_company_docs")) || []
  );
  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem("nirvati_addresses")) || []
  );
  const [activeTab, setActiveTab] = useState("profile");
  const [loginInput, setLoginInput] = useState({ email: "", phone: "" });
  const [newAddress, setNewAddress] = useState({ label: "Home", address: "" });
  const [problemText, setProblemText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle

  // Persist localStorage
  useEffect(
    () => localStorage.setItem("nirvati_user", JSON.stringify(user)),
    [user]
  );
  useEffect(
    () => localStorage.setItem("nirvati_orders", JSON.stringify(orders)),
    [orders]
  );
  useEffect(
    () => localStorage.setItem("nirvati_user_docs", JSON.stringify(userDocs)),
    [userDocs]
  );
  useEffect(
    () =>
      localStorage.setItem("nirvati_company_docs", JSON.stringify(companyDocs)),
    [companyDocs]
  );
  useEffect(
    () => localStorage.setItem("nirvati_addresses", JSON.stringify(addresses)),
    [addresses]
  );

  // --- Handlers ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginInput.email && !loginInput.phone) {
      alert("Enter email or phone to login (demo).");
      return;
    }
    const name = loginInput.email
      ? loginInput.email.split("@")[0]
      : `User${loginInput.phone?.slice(-4)}`;
    setUser({
      name,
      email: loginInput.email || "",
      phone: loginInput.phone || "",
    });
    setActiveTab("profile");
    alert("Logged in (demo). Data stored locally.");
  };
  const handleLogout = () => setUser(null);
  const handleAddAddress = () => {
    if (!newAddress.address.trim()) return alert("Enter address.");
    setAddresses((s) => [{ id: Date.now(), ...newAddress }, ...s]);
    setNewAddress({ label: "Home", address: "" });
  };
  const handleRemoveAddress = (id) =>
    setAddresses((s) => s.filter((a) => a.id !== id));
  const handleUploadUserDoc = (file, orderId = null) => {
    if (!file) return;
    const doc = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
      orderId,
    };
    setUserDocs((s) => [doc, ...s]);
    if (orderId)
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, docs: [...(o.docs || []), doc] } : o
        )
      );
    alert("Document added locally (preview available).");
  };
  const handleRemoveUserDoc = (id) => {
    setUserDocs((s) => s.filter((d) => d.id !== id));
    setOrders((prev) =>
      prev.map((o) => ({
        ...o,
        docs: (o.docs || []).filter((d) => d.id !== id),
      }))
    );
  };
  const handleCompanyDocUpload = (file) => {
    if (!file) return;
    const doc = {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    };
    setCompanyDocs((s) => [doc, ...s]);
    alert("Company document saved locally.");
  };
  const handleReportProblem = (orderId) => {
    if (!problemText.trim()) return alert("Write your problem first.");
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              problems: [
                ...(o.problems || []),
                {
                  id: Date.now(),
                  text: problemText,
                  at: new Date().toISOString(),
                },
              ],
            }
          : o
      )
    );
    setProblemText("");
    alert("Problem noted locally.");
  };
  const handleRemoveFromWishlist = (id) => {
    if (setWishlist)
      setWishlist((w) => w.filter((it) => (it.id ? it.id !== id : it !== id)));
  };
  const addToCartFromWishlist = (product) => {
    if (!product) return;
    const p = {
      id: product.id || product.productId || Date.now(),
      name: product.title || product.name || "Product",
      price: product.price || 0,
      image: product.image || "",
      quantity: 1,
      category: product.category || "",
    };
    if (setCartItems) {
      setCartItems((c) => {
        const existing = (c || []).find((i) => i.id === p.id);
        if (existing)
          return c.map((i) =>
            i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        return [...(c || []), p];
      });
    }
    alert("Added to cart (from wishlist).");
  };

  const DownloadLink = ({ url, name }) => (
    <a
      href={url}
      download={name}
      style={{ color: "#0b74ff", textDecoration: "none" }}
    >
      Download
    </a>
  );

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>My Account</h1>
      <p style={{ color: "#6b7280", marginTop: 0 }}>
        NIRVATI HERBAL PRIVATE LIMITED - Customer Dashboard (demo)
      </p>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{ display: "none", marginBottom: 12 }}
        className="mobile-sidebar-btn"
      >
        {sidebarOpen ? "Close Menu" : "Menu"}
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          marginTop: 20,
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            flex: "1 1 220px",
            minWidth: 220,
            borderRight: "1px solid #e5e7eb",
            paddingRight: 16,
            display: sidebarOpen ? "block" : "block",
          }}
          className="sidebar"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <strong>{user ? user.name : "Guest"}</strong>
            {user && (
              <button onClick={handleLogout} style={btnSmall}>
                Sign out
              </button>
            )}
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "profile",
              "orders",
              "wishlist",
              "addresses",
              "documents",
              "companydocs",
            ].map((tab) => (
              <button
                key={tab}
                style={tabButton(activeTab === tab)}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() +
                  tab.slice(1).replace("docs", " Documents")}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: 20 }}>
            <button
              style={ctaButton}
              onClick={() => setActiveSection("products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: "3 1 600px", minWidth: 300 }}>
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <section>
              <h2 style={sectionTitle}>Profile</h2>
              {!user ? (
                <form
                  onSubmit={handleLogin}
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <p style={{ color: "#6b7280" }}>
                    Quick demo login (client-side only)
                  </p>
                  <input
                    placeholder="Email"
                    value={loginInput.email}
                    onChange={(e) =>
                      setLoginInput({ ...loginInput, email: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <input
                    placeholder="Mobile (optional)"
                    value={loginInput.phone}
                    onChange={(e) =>
                      setLoginInput({ ...loginInput, phone: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button type="submit" style={ctaButton}>
                      Login
                    </button>
                    <button
                      type="button"
                      style={secondaryBtn}
                      onClick={() =>
                        setLoginInput({ email: "guest@example.com", phone: "" })
                      }
                    >
                      Use Demo
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div>
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email || "-"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user.phone || "-"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Orders:</strong> {orders.length}
                    </p>
                    <p>
                      <strong>Wishlist:</strong>{" "}
                      {Array.isArray(wishlist) ? wishlist.length : 0}
                    </p>
                    <p>
                      <strong>Addresses:</strong> {addresses.length}
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <section>
              <h2 style={sectionTitle}>Your Orders</h2>
              {orders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                orders.map((o) => (
                  <div key={o.id} style={cardStyle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <strong>{o.id}</strong> ·{" "}
                        <span style={{ color: "#6b7280" }}>{o.date}</span>
                        <div style={{ marginTop: 6 }}>
                          Status: <strong>{o.status}</strong>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700 }}>₹{o.total}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>
                          {o.courier?.name}{" "}
                          {o.courier?.trackingId
                            ? `· ${o.courier.trackingId}`
                            : ""}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 8 }}>
                      {o.items.map((it) => (
                        <div
                          key={it.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "2px 0",
                          }}
                        >
                          <span>
                            {it.name} x{it.qty}
                          </span>
                          <span>₹{it.price * it.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <input
                        type="file"
                        onChange={(e) =>
                          handleUploadUserDoc(e.target.files[0], o.id)
                        }
                        style={{ flex: 1 }}
                      />
                      <input
                        placeholder="Report Problem"
                        value={problemText}
                        onChange={(e) => setProblemText(e.target.value)}
                        style={{
                          flex: 2,
                          borderRadius: 6,
                          border: "1px solid #d1d5db",
                          padding: 4,
                        }}
                      />
                      <button
                        style={ctaButtonSmall}
                        onClick={() => handleReportProblem(o.id)}
                      >
                        Submit
                      </button>
                    </div>

                    {(o.problems || []).map((p) => (
                      <div
                        key={p.id}
                        style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}
                      >
                        Problem: {p.text}{" "}
                        <span style={{ color: "#6b7280" }}>
                          ({new Date(p.at).toLocaleString()})
                        </span>
                      </div>
                    ))}

                    {(o.docs || []).map((d) => (
                      <div key={d.id} style={{ fontSize: 12, marginTop: 4 }}>
                        {d.name} · <DownloadLink url={d.url} name={d.name} /> ·{" "}
                        <button
                          style={tinyDanger}
                          onClick={() => handleRemoveUserDoc(d.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </section>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <section>
              <h2 style={sectionTitle}>Wishlist</h2>
              {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
              ) : (
                wishlist.map((p, i) => (
                  <div key={i} style={cardStyle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontWeight: 500 }}>{p.title || p.name}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          style={ctaButtonSmall}
                          onClick={() => addToCartFromWishlist(p)}
                        >
                          Add to Cart
                        </button>
                        <button
                          style={tinyDanger}
                          onClick={() => handleRemoveFromWishlist(p.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </section>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <section>
              <h2 style={sectionTitle}>Addresses</h2>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                <input
                  placeholder="Label"
                  value={newAddress.label}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, label: e.target.value })
                  }
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input
                  placeholder="Address"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  style={{ ...inputStyle, flex: 3 }}
                />
                <button style={ctaButtonSmall} onClick={handleAddAddress}>
                  Add
                </button>
              </div>
              {addresses.length === 0 ? (
                <p>No addresses added yet.</p>
              ) : (
                addresses.map((a) => (
                  <div key={a.id} style={cardStyle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        <strong>{a.label}</strong>: {a.address}
                      </span>
                      <button
                        style={tinyDanger}
                        onClick={() => handleRemoveAddress(a.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          )}

          {/* User Docs Tab */}
          {activeTab === "documents" && (
            <section>
              <h2 style={sectionTitle}>Your Documents</h2>
              <input
                type="file"
                onChange={(e) => handleUploadUserDoc(e.target.files[0])}
                style={{ marginBottom: 12 }}
              />
              {userDocs.length === 0 ? (
                <p>No documents uploaded yet.</p>
              ) : (
                userDocs.map((d) => (
                  <div key={d.id} style={cardStyle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 14,
                      }}
                    >
                      <span>
                        {d.name} · <DownloadLink url={d.url} name={d.name} />
                      </span>
                      <button
                        style={tinyDanger}
                        onClick={() => handleRemoveUserDoc(d.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          )}

          {/* Company Docs Tab */}
          {activeTab === "companydocs" && (
            <section>
              <h2 style={sectionTitle}>Company Documents</h2>
              <input
                type="file"
                onChange={(e) => handleCompanyDocUpload(e.target.files[0])}
                style={{ marginBottom: 12 }}
              />
              {companyDocs.length === 0 ? (
                <p>No company documents uploaded yet.</p>
              ) : (
                companyDocs.map((d) => (
                  <div key={d.id} style={cardStyle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 14,
                      }}
                    >
                      <span>
                        {d.name} · <DownloadLink url={d.url} name={d.name} />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const inputStyle = {
  padding: 8,
  borderRadius: 6,
  border: "1px solid #d1d5db",
  width: "100%",
  outline: "none",
};
const ctaButton = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  backgroundColor: "#16a34a",
  color: "#fff",
  fontWeight: 500,
};
const ctaButtonSmall = {
  padding: "4px 12px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  backgroundColor: "#16a34a",
  color: "#fff",
  fontSize: 13,
  fontWeight: 500,
};
const secondaryBtn = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  cursor: "pointer",
  backgroundColor: "#f9fafb",
  color: "#111",
};
const tinyDanger = {
  padding: "2px 8px",
  borderRadius: 4,
  border: "none",
  cursor: "pointer",
  backgroundColor: "#ef4444",
  color: "#fff",
  fontSize: 12,
};
const btnSmall = {
  padding: "4px 8px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  cursor: "pointer",
  backgroundColor: "#f3f4f6",
  fontSize: 12,
};
const cardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};
const sectionTitle = {
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 12,
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 6,
};
const tabButton = (active) => ({
  padding: "8px 12px",
  borderRadius: 6,
  border: "none",
  backgroundColor: active ? "#16a34a" : "#f3f4f6",
  color: active ? "#fff" : "#111",
  cursor: "pointer",
  textAlign: "left",
});

export default UserAccount;
