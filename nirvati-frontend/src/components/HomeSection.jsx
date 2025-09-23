import React from "react";
import "../CSS/HomeSection.css";

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
    <section className="home-section">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>
          Discover Natural Healing with <span>Nirvati Herbal</span>
        </h1>
        <p>
          Experience the power of Ayurveda through scientifically-backed herbal
          solutions tailored for your wellness.
        </p>
        <div className="hero-buttons">
          <button onClick={() => setActiveSection("test")} className="hero-btn">
            Take Free Health Test
          </button>
          <button
            onClick={() => setIsChatOpen(true)}
            className="hero-btn-secondary"
          >
            Consult Expert
          </button>
        </div>
      </div>

      {/* Care Categories */}
      <div className="care-categories">
        <h2>Our Special Care Solutions</h2>
        <div className="care-grid">
          {careCategories.map((cat, i) => (
            <div key={i} className="care-card" style={{ background: "#fff" }}>
              <div className="care-icon" style={{ background: cat.gradient }}>
                {cat.icon}
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <div className="care-products">
                {cat.products.map((p, idx) => (
                  <div key={idx}>✓ {p}</div>
                ))}
              </div>
              <button
                className="explore-btn"
                style={{ background: cat.gradient }}
              >
                Explore Products →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="statistics">
        {statistics.map((stat, i) => (
          <div key={i} className="stat-item">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <img src={t.image} alt={t.name} />
              <h4>{t.name}</h4>
              <p className="location">{t.location}</p>
              <p className="rating">{"⭐".repeat(t.rating)}</p>
              <p className="testimonial-text">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
