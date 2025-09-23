import React from "react";

// Props: setActiveSection, setIsChatOpen
const HomeSection = ({ setActiveSection, setIsChatOpen }) => {
  const careCategories = [
    {
      title: "Heart Care",
      description: "Ayurvedic solutions for heart health",
      gradient: "linear-gradient(90deg, #fbbf24, #f97316)",
      icon: "❤️",
      products: ["Herbal Heart Tonic", "Cardio Support Capsules"],
    },
    {
      title: "Diabetes Care",
      description: "Maintain healthy sugar levels naturally",
      gradient: "linear-gradient(90deg, #3b82f6, #60a5fa)",
      icon: "🩸",
      products: ["Sugar Balance Powder", "Diabetics Support Capsule"],
    },
    {
      title: "Immunity Boost",
      description: "Strengthen your body's natural defenses",
      gradient: "linear-gradient(90deg, #10b981, #6ee7b7)",
      icon: "🛡️",
      products: ["Immunity Capsules", "Herbal Supplements"],
    },
    {
      title: "Joint Care",
      description: "Support joint mobility and flexibility",
      gradient: "linear-gradient(90deg, #f43f5e, #fb7185)",
      icon: "🦵",
      products: ["Joint Relief Powder", "Flexi Capsules"],
    },
  ];

  const testimonials = [
    {
      name: "Rahul Kumar",
      location: "Patna, Bihar",
      rating: 5,
      text: "The herbal solutions really improved my health!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Singh",
      location: "Motihari, Bihar",
      rating: 4,
      text: "Excellent products and quick delivery.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Anjali Mehta",
      location: "Delhi",
      rating: 5,
      text: "Highly recommend! The products are effective and natural.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const statistics = [
    { label: "Years of Experience", value: 15 },
    { label: "Trusted Customers", value: "10K+" },
    { label: "Herbal Products", value: 120 },
    { label: "Clinics Connected", value: 25 },
  ];

  return (
    <section style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(to right, #16a34a, #4ade80)",
          color: "#fff",
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: 20 }}>
          Discover Natural Healing with{" "}
          <span style={{ fontWeight: 700 }}>Nirvati Herbal</span>
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: 700, margin: "0 auto 30px" }}>
          Experience the power of Ayurveda through scientifically-backed herbal
          solutions tailored for your wellness.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => setActiveSection("test")} style={heroButton}>
            Take Free Health Test
          </button>
          <button
            onClick={() => setIsChatOpen(true)}
            style={heroButtonSecondary}
          >
            Consult Expert
          </button>
        </div>
      </div>

      {/* Care Categories */}
      <div style={{ padding: "60px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: 40 }}>
          Our Special Care Solutions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}
        >
          {careCategories.map((cat, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  background: cat.gradient,
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: "#fff",
                }}
              >
                {cat.icon}
              </div>
              <h3 style={{ marginBottom: 10 }}>{cat.title}</h3>
              <p
                style={{ color: "#555", fontSize: "0.95rem", marginBottom: 12 }}
              >
                {cat.description}
              </p>
              <div
                style={{
                  marginBottom: 16,
                  fontSize: "0.9rem",
                  color: "#16a34a",
                }}
              >
                {cat.products.map((p, idx) => (
                  <div key={idx}>✓ {p}</div>
                ))}
              </div>
              <button
                style={{
                  background: cat.gradient,
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                Explore Products →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div
        style={{
          background: "#f0fdf4",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        {statistics.map((stat, i) => (
          <div key={i}>
            <h3 style={{ fontSize: "2rem", color: "#16a34a", marginBottom: 6 }}>
              {stat.value}
            </h3>
            <p style={{ color: "#555" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div style={{ padding: "60px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: 40 }}>
          What Our Customers Say
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  marginBottom: 12,
                }}
              />
              <h4 style={{ marginBottom: 4 }}>{t.name}</h4>
              <p
                style={{ color: "#777", fontSize: "0.85rem", marginBottom: 8 }}
              >
                {t.location}
              </p>
              <p style={{ color: "#f59e0b", marginBottom: 8 }}>
                {"⭐".repeat(t.rating)}
              </p>
              <p style={{ color: "#555", fontSize: "0.95rem" }}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Buttons Styles ---
const heroButton = {
  background: "#fff",
  color: "#16a34a",
  border: "none",
  padding: "14px 28px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 600,
  transition: "transform 0.2s, background 0.2s",
};
const heroButtonSecondary = {
  background: "transparent",
  border: "2px solid #fff",
  color: "#fff",
  padding: "14px 28px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 600,
  transition: "transform 0.2s, background 0.2s",
};

export default HomeSection;
