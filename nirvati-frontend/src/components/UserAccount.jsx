import React, { useState, useEffect } from "react";
import "../CSS/UserAccount.css";

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

  // Persist to localStorage
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
    <a href={url} download={name} className="download-link">
      {name}
    </a>
  );

  return (
    <div className="user-account-container">
      <h1>My Account</h1>
      <p className="subtext">
        NIRVATI HERBAL PRIVATE LIMITED - Customer Dashboard (demo)
      </p>

      <div className="account-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <strong>{user ? user.name : "Guest"}</strong>
            {user && (
              <button className="btn-small" onClick={handleLogout}>
                Sign out
              </button>
            )}
          </div>

          <nav className="sidebar-nav">
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
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() +
                  tab.slice(1).replace("docs", " Documents")}
              </button>
            ))}
          </nav>

          <button
            className="cta-button continue-shopping"
            onClick={() => setActiveSection("products")}
          >
            Continue Shopping
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <section>
              <h2 className="section-title">Profile</h2>
              {!user ? (
                <form className="login-form" onSubmit={handleLogin}>
                  <p className="subtext">Quick demo login (client-side only)</p>
                  <input
                    placeholder="Email"
                    value={loginInput.email}
                    onChange={(e) =>
                      setLoginInput({ ...loginInput, email: e.target.value })
                    }
                  />
                  <input
                    placeholder="Mobile (optional)"
                    value={loginInput.phone}
                    onChange={(e) =>
                      setLoginInput({ ...loginInput, phone: e.target.value })
                    }
                  />
                  <div className="login-btns">
                    <button type="submit" className="cta-button">
                      Login
                    </button>
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() =>
                        setLoginInput({ email: "guest@example.com", phone: "" })
                      }
                    >
                      Use Demo
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-grid">
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
              <h2 className="section-title">Your Orders</h2>
              {orders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="card">
                    <div className="order-header">
                      <div>
                        <strong>{o.id}</strong> ·{" "}
                        <span className="subtext">{o.date}</span>
                        <div>
                          Status: <strong>{o.status}</strong>
                        </div>
                      </div>
                      <div className="order-total">
                        ₹{o.total}
                        <div className="subtext">
                          {o.courier?.name}
                          {o.courier?.trackingId
                            ? ` · ${o.courier.trackingId}`
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="order-items">
                      {o.items.map((it) => (
                        <div key={it.id} className="order-item">
                          {it.name} x{it.qty} <span>₹{it.price * it.qty}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-actions">
                      <input
                        type="file"
                        onChange={(e) =>
                          handleUploadUserDoc(e.target.files[0], o.id)
                        }
                      />
                      <input
                        placeholder="Report Problem"
                        value={problemText}
                        onChange={(e) => setProblemText(e.target.value)}
                      />
                      <button
                        className="cta-button-small"
                        onClick={() => handleReportProblem(o.id)}
                      >
                        Submit
                      </button>
                    </div>
                    {(o.problems || []).map((p) => (
                      <div key={p.id} className="problem-text">
                        Problem: {p.text}{" "}
                        <span>({new Date(p.at).toLocaleString()})</span>
                      </div>
                    ))}
                    {(o.docs || []).map((d) => (
                      <div key={d.id} className="doc-text">
                        {d.name} · <DownloadLink url={d.url} name={d.name} /> ·
                        <button
                          className="tiny-danger"
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
              <h2 className="section-title">Wishlist</h2>
              {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
              ) : (
                wishlist.map((p, i) => (
                  <div key={i} className="card">
                    <div className="wishlist-item">
                      <div>{p.title || p.name}</div>
                      <div className="wishlist-actions">
                        <button
                          className="cta-button-small"
                          onClick={() => addToCartFromWishlist(p)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="tiny-danger"
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
              <h2 className="section-title">Addresses</h2>
              <div className="add-address">
                <input
                  placeholder="Label"
                  value={newAddress.label}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, label: e.target.value })
                  }
                />
                <input
                  placeholder="Address"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                />
                <button className="cta-button-small" onClick={handleAddAddress}>
                  Add
                </button>
              </div>
              {addresses.length === 0 ? (
                <p>No addresses added yet.</p>
              ) : (
                addresses.map((a) => (
                  <div key={a.id} className="card address-item">
                    <div>
                      {a.label}: {a.address}{" "}
                      <button
                        className="tiny-danger"
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

          {/* User Documents Tab */}
          {activeTab === "documents" && (
            <section>
              <h2 className="section-title">Your Documents</h2>
              <input
                type="file"
                onChange={(e) => handleUploadUserDoc(e.target.files[0])}
              />
              {userDocs.length === 0 ? (
                <p>No documents uploaded yet.</p>
              ) : (
                userDocs.map((d) => (
                  <div key={d.id} className="card">
                    {d.name} · <DownloadLink url={d.url} name={d.name} />
                    <button
                      className="tiny-danger"
                      onClick={() => handleRemoveUserDoc(d.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </section>
          )}

          {/* Company Documents Tab */}
          {activeTab === "companydocs" && (
            <section>
              <h2 className="section-title">Company Documents</h2>
              <input
                type="file"
                onChange={(e) => handleCompanyDocUpload(e.target.files[0])}
              />
              {companyDocs.length === 0 ? (
                <p>No company documents uploaded yet.</p>
              ) : (
                companyDocs.map((d) => (
                  <div key={d.id} className="card">
                    {d.name} · <DownloadLink url={d.url} name={d.name} />
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

export default UserAccount;
