import React, { useState, useEffect, useRef } from "react";

const NirvatiHerbal = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm your Ayurvedic health assistant. How can I help you today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [testStep, setTestStep] = useState(0);
  const [testAnswers, setTestAnswers] = useState({});
  const [showTestResults, setShowTestResults] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleChatSend = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { type: "user", text: chatInput }]);
      setChatInput("");

      setTimeout(() => {
        const responses = [
          "Thank you for your question. Our Ayurvedic experts recommend personalized treatment based on your dosha type.",
          "For better assistance, I'd suggest taking our health assessment test to understand your specific needs.",
          "Based on Ayurvedic principles, I can help you find the right herbal solutions. What specific health concern do you have?",
          "Our natural remedies are formulated using traditional Ayurvedic wisdom. Would you like to know more about any specific product?",
        ];
        setChatMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: responses[Math.floor(Math.random() * responses.length)],
          },
        ]);
      }, 1000);
    }
  };

  const careCategories = [
    {
      icon: "❤️",
      title: "Heart Care",
      description: "Natural solutions for cardiovascular health",
      gradient: "linear-gradient(135deg, #ef4444, #ec4899)",
      products: ["Arjuna Capsules", "Heart Tonic", "Cardio Care"],
    },
    {
      icon: "💧",
      title: "Kidney Care",
      description: "Herbal remedies for kidney wellness",
      gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      products: ["Kidney Detox", "Renal Care", "Stone Care"],
    },
    {
      icon: "🧠",
      title: "Brain Care",
      description: "Memory and cognitive enhancement",
      gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
      products: ["Brahmi Capsules", "Memory Booster", "Neuro Care"],
    },
    {
      icon: "🩺",
      title: "Diabetes Care",
      description: "Blood sugar management naturally",
      gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
      products: ["Diabetes Control", "Sugar Balance", "Metabolic Care"],
    },
    {
      icon: "🛡️",
      title: "Liver Care",
      description: "Detox and liver protection",
      gradient: "linear-gradient(135deg, #eab308, #f97316)",
      products: ["Liver Detox", "Hepato Care", "Liver Tonic"],
    },
    {
      icon: "🌿",
      title: "Immunity Care",
      description: "Boost natural immunity",
      gradient: "linear-gradient(135deg, #059669, #16a34a)",
      products: ["Immunity Booster", "Defense Shield", "Vital Care"],
    },
  ];

  const healthQuestions = [
    {
      question: "What is your primary health concern?",
      options: [
        "Hair Loss",
        "Skin Issues",
        "Digestive Problems",
        "Sleep Issues",
        "Energy Levels",
        "Joint Pain",
      ],
    },
    {
      question: "How would you describe your daily stress level?",
      options: ["Very Low", "Low", "Moderate", "High", "Very High"],
    },
    {
      question: "What is your typical sleep pattern?",
      options: [
        "7-8 hours quality sleep",
        "6-7 hours",
        "Less than 6 hours",
        "Irregular sleep",
        "Insomnia issues",
      ],
    },
    {
      question: "How is your digestive health?",
      options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
    },
    {
      question: "What is your activity level?",
      options: [
        "Very Active",
        "Active",
        "Moderate",
        "Sedentary",
        "Very Sedentary",
      ],
    },
  ];

  const handleTestAnswer = (answer) => {
    setTestAnswers({ ...testAnswers, [testStep]: answer });
    if (testStep < healthQuestions.length - 1) {
      setTestStep(testStep + 1);
    } else {
      setShowTestResults(true);
    }
  };

  const resetTest = () => {
    setTestStep(0);
    setTestAnswers({});
    setShowTestResults(false);
  };

  const getTestRecommendation = () => {
    const concerns = Object.values(testAnswers);
    if (concerns.includes("Hair Loss")) {
      return {
        title: "Hair & Scalp Care Recommended",
        description:
          "Based on your responses, we recommend our specialized hair care regimen.",
        products: [
          "Hair Growth Serum",
          "Scalp Nourishment Oil",
          "Hair Strength Capsules",
        ],
        dosha: "Pitta-Vata imbalance detected",
      };
    }
    return {
      title: "General Wellness Program",
      description:
        "A comprehensive approach to your overall health and wellness.",
      products: [
        "Daily Wellness Capsules",
        "Immunity Booster",
        "Stress Relief Tea",
      ],
      dosha: "Balanced constitution recommended",
    };
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "Nirvati Herbal's diabetes care products have significantly improved my blood sugar levels. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c4f55c03?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      text: "The liver detox program worked wonders. I feel more energetic and healthier than ever.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Anita Desai",
      location: "Bangalore",
      text: "Their hair care solutions helped me regain my confidence. Amazing natural products!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
    },
    header: {
      backgroundColor: "white",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 40,
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 0",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    logoIcon: {
      width: "48px",
      height: "48px",
      background: "linear-gradient(135deg, #16a34a, #059669)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      margin: 0,
    },
    logoSubtext: {
      fontSize: "12px",
      color: "#6b7280",
      margin: 0,
    },
    nav: {
      display: "flex",
      gap: "32px",
      alignItems: "center",
    },
    navButton: {
      background: "none",
      border: "none",
      fontWeight: "500",
      color: "#374151",
      cursor: "pointer",
      transition: "color 0.2s",
      fontSize: "16px",
    },
    navButtonActive: {
      color: "#16a34a",
    },
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    chatButton: {
      background: "linear-gradient(135deg, #16a34a, #059669)",
      color: "white",
      border: "none",
      padding: "8px 24px",
      borderRadius: "24px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s",
    },
    mobileMenuButton: {
      display: "none",
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#6b7280",
    },
    hero: {
      background: "linear-gradient(135deg, #064e3b, #065f46, #059669)",
      color: "white",
      padding: "80px 20px",
      position: "relative",
      overflow: "hidden",
    },
    heroOverlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    heroContent: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "48px",
      alignItems: "center",
      position: "relative",
      zIndex: 10,
    },
    heroTitle: {
      fontSize: "4rem",
      fontWeight: "bold",
      lineHeight: "1.1",
      marginBottom: "16px",
    },
    heroGradientText: {
      background: "linear-gradient(135deg, #fbbf24, #f97316)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    heroSubtitle: {
      fontSize: "20px",
      color: "#a7f3d0",
      lineHeight: "1.6",
      marginBottom: "32px",
    },
    heroButtons: {
      display: "flex",
      gap: "16px",
      marginBottom: "32px",
    },
    primaryButton: {
      background: "linear-gradient(135deg, #eab308, #f97316)",
      color: "white",
      border: "none",
      padding: "16px 32px",
      borderRadius: "24px",
      fontWeight: "600",
      fontSize: "18px",
      cursor: "pointer",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    secondaryButton: {
      background: "transparent",
      color: "white",
      border: "2px solid white",
      padding: "16px 32px",
      borderRadius: "24px",
      fontWeight: "600",
      fontSize: "18px",
      cursor: "pointer",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    heroStats: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "24px",
      paddingTop: "32px",
    },
    heroStat: {
      textAlign: "center",
    },
    heroStatNumber: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#fbbf24",
    },
    heroStatLabel: {
      color: "#a7f3d0",
    },
    heroImage: {
      position: "relative",
    },
    heroImageMain: {
      borderRadius: "16px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      width: "100%",
      position: "relative",
      zIndex: 10,
    },
    section: {
      padding: "80px 20px",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#1f2937",
      textAlign: "center",
      marginBottom: "16px",
    },
    sectionSubtitle: {
      fontSize: "20px",
      color: "#6b7280",
      textAlign: "center",
      marginBottom: "64px",
      maxWidth: "768px",
      margin: "0 auto 64px auto",
    },
    careGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "32px",
    },
    careCard: {
      backgroundColor: "white",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s",
      cursor: "pointer",
      border: "1px solid #e5e7eb",
    },
    careIcon: {
      width: "64px",
      height: "64px",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      marginBottom: "24px",
      transition: "transform 0.3s",
    },
    careTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "12px",
    },
    careDescription: {
      color: "#6b7280",
      marginBottom: "24px",
    },
    careProducts: {
      marginBottom: "24px",
    },
    careProduct: {
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "8px",
    },
    careProductIcon: {
      color: "#16a34a",
      marginRight: "8px",
    },
    careExplore: {
      color: "#16a34a",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    whyChooseSection: {
      backgroundColor: "white",
    },
    whyChooseGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "64px",
      alignItems: "center",
    },
    whyChooseFeatures: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    whyChooseFeature: {
      display: "flex",
      alignItems: "flex-start",
      gap: "16px",
    },
    whyChooseIcon: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      flexShrink: 0,
    },
    whyChooseFeatureTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "8px",
    },
    whyChooseFeatureText: {
      color: "#6b7280",
    },
    testimonialsSection: {
      background: "linear-gradient(135deg, #f0fdf4, #ecfeff)",
    },
    testimonialsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "32px",
    },
    testimonialCard: {
      backgroundColor: "white",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.3s",
    },
    testimonialHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "24px",
    },
    testimonialAvatar: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      marginRight: "16px",
    },
    testimonialName: {
      fontWeight: "600",
      color: "#1f2937",
    },
    testimonialLocation: {
      fontSize: "14px",
      color: "#6b7280",
    },
    testimonialStars: {
      display: "flex",
      marginBottom: "16px",
    },
    testimonialText: {
      color: "#374151",
      fontStyle: "italic",
    },
    testSection: {
      background: "linear-gradient(135deg, #f0fdf4, #ecfeff)",
      minHeight: "100vh",
      padding: "80px 20px",
    },
    testCard: {
      backgroundColor: "white",
      borderRadius: "24px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      padding: "48px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    testHeader: {
      textAlign: "center",
      marginBottom: "48px",
    },
    testProgress: {
      width: "100%",
      height: "12px",
      backgroundColor: "#e5e7eb",
      borderRadius: "6px",
      overflow: "hidden",
      marginTop: "24px",
    },
    testProgressBar: {
      height: "100%",
      background: "linear-gradient(135deg, #16a34a, #3b82f6)",
      borderRadius: "6px",
      transition: "width 0.5s",
    },
    testQuestion: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1f2937",
      textAlign: "center",
      marginBottom: "32px",
    },
    testOptions: {
      display: "grid",
      gap: "16px",
    },
    testOption: {
      padding: "16px",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      backgroundColor: "white",
      cursor: "pointer",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    resultsHeader: {
      textAlign: "center",
      marginBottom: "48px",
    },
    resultsIcon: {
      width: "96px",
      height: "96px",
      backgroundColor: "#dcfce7",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "48px",
      color: "#16a34a",
      margin: "0 auto 24px auto",
    },
    resultsRecommendation: {
      background: "linear-gradient(135deg, #dcfce7, #dbeafe)",
      borderRadius: "16px",
      padding: "32px",
      marginBottom: "32px",
    },
    resultsProducts: {
      marginBottom: "32px",
    },
    resultsProductItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      marginBottom: "16px",
    },
    resultsProductLeft: {
      display: "flex",
      alignItems: "center",
    },
    addToCartButton: {
      backgroundColor: "#16a34a",
      color: "white",
      border: "none",
      padding: "8px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    resultsActions: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
    },
    secondaryActionButton: {
      border: "2px solid #d1d5db",
      color: "#374151",
      backgroundColor: "white",
      padding: "12px 32px",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "border-color 0.2s",
    },
    primaryActionButton: {
      background: "linear-gradient(135deg, #16a34a, #3b82f6)",
      color: "white",
      border: "none",
      padding: "12px 32px",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    footer: {
      backgroundColor: "#111827",
      color: "white",
      padding: "64px 20px",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "32px",
      marginBottom: "48px",
    },
    footerSection: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    footerTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "24px",
    },
    footerLink: {
      color: "#9ca3af",
      textDecoration: "none",
      transition: "color 0.2s",
      marginBottom: "12px",
    },
    footerBottom: {
      borderTop: "1px solid #374151",
      paddingTop: "32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    footerCopyright: {
      color: "#9ca3af",
      fontSize: "14px",
    },
    chatOverlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    chatWidget: {
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      width: "100%",
      maxWidth: "400px",
      height: "600px",
      display: "flex",
      flexDirection: "column",
    },
    chatHeader: {
      background: "linear-gradient(135deg, #16a34a, #059669)",
      color: "white",
      padding: "16px",
      borderRadius: "16px 16px 0 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    chatHeaderContent: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    chatHeaderIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    chatMessages: {
      flex: 1,
      overflowY: "auto",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    chatMessage: {
      display: "flex",
    },
    chatMessageUser: {
      justifyContent: "flex-end",
    },
    chatMessageBot: {
      justifyContent: "flex-start",
    },
    chatBubble: {
      maxWidth: "80%",
      padding: "12px",
      borderRadius: "16px",
      fontSize: "14px",
    },
    chatBubbleUser: {
      backgroundColor: "#16a34a",
      color: "white",
      borderBottomRightRadius: "4px",
    },
    chatBubbleBot: {
      backgroundColor: "#f3f4f6",
      color: "#1f2937",
      borderBottomLeftRadius: "4px",
    },
    chatInput: {
      padding: "16px",
      borderTop: "1px solid #e5e7eb",
    },
    chatInputRow: {
      display: "flex",
      gap: "8px",
    },
    chatInputField: {
      flex: 1,
      border: "1px solid #d1d5db",
      borderRadius: "24px",
      padding: "8px 16px",
      outline: "none",
    },
    chatSendButton: {
      backgroundColor: "#16a34a",
      color: "white",
      border: "none",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    floatingChatButton: {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      width: "64px",
      height: "64px",
      background: "linear-gradient(135deg, #16a34a, #059669)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      transition: "all 0.3s",
    },
    notificationBadge: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      backgroundColor: "#ef4444",
      color: "white",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      animation: "pulse 2s infinite",
    },
  };

  // Add CSS animations
  const cssAnimations = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
    
    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .hero-title { font-size: 3rem !important; }
      .care-grid { grid-template-columns: 1fr !important; }
      .why-choose-grid { grid-template-columns: 1fr !important; }
      .testimonials-grid { grid-template-columns: 1fr !important; }
      .footer-grid { grid-template-columns: 1fr !important; }
      .nav-desktop { display: none !important; }
      .mobile-menu-button { display: block !important; }
      .hero-buttons { flex-direction: column !important; }
    }
    
    .care-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .care-icon:hover {
      transform: scale(1.1);
    }
    
    .test-option:hover {
      border-color: #16a34a;
      background-color: #f0fdf4;
    }
    
    .testimonial-card:hover {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    }
    
    .floating-chat-button:hover {
      transform: scale(1.1);
    }
  `;

  const renderHome = () => (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.container}>
          <div style={styles.heroContent} className="hero-grid">
            <div>
              <h1 style={styles.heroTitle} className="hero-title">
                Ancient Wisdom,
                <br />
                <span style={styles.heroGradientText}>Modern Healing</span>
              </h1>
              <p style={styles.heroSubtitle}>
                Discover the power of Ayurveda with our scientifically-backed
                herbal solutions. Trusted by over 100,000+ customers for natural
                wellness.
              </p>
              <div style={styles.heroButtons} className="hero-buttons">
                <button
                  style={styles.primaryButton}
                  onClick={() => setActiveSection("test")}
                >
                  🎯 Take Free Health Test
                </button>
                <button style={styles.secondaryButton}>
                  ▶️ Watch Our Story
                </button>
              </div>
              <div style={styles.heroStats}>
                <div style={styles.heroStat}>
                  <div style={styles.heroStatNumber}>100K+</div>
                  <div style={styles.heroStatLabel}>Happy Customers</div>
                </div>
                <div style={styles.heroStat}>
                  <div style={styles.heroStatNumber}>15+</div>
                  <div style={styles.heroStatLabel}>Years Experience</div>
                </div>
                <div style={styles.heroStat}>
                  <div style={styles.heroStatNumber}>500+</div>
                  <div style={styles.heroStatLabel}>Herbal Products</div>
                </div>
              </div>
            </div>
            <div style={styles.heroImage}>
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                alt="Ayurvedic herbs and medicine"
                style={styles.heroImageMain}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Care Categories */}
      <section style={{ ...styles.section, backgroundColor: "#f9fafb" }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Specialized Care Solutions</h2>
          <p style={styles.sectionSubtitle}>
            Our comprehensive range of Ayurvedic solutions target specific
            health concerns with precision and care
          </p>
          <div style={styles.careGrid} className="care-grid">
            {careCategories.map((category, index) => (
              <div key={index} style={styles.careCard} className="care-card">
                <div
                  style={{
                    ...styles.careIcon,
                    background: category.gradient,
                  }}
                  className="care-icon"
                >
                  {category.icon}
                </div>
                <h3 style={styles.careTitle}>{category.title}</h3>
                <p style={styles.careDescription}>{category.description}</p>
                <div style={styles.careProducts}>
                  {category.products.map((product, idx) => (
                    <div key={idx} style={styles.careProduct}>
                      <span style={styles.careProductIcon}>✓</span>
                      {product}
                    </div>
                  ))}
                </div>
                <button style={styles.careExplore}>
                  Explore Products
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={styles.whyChooseSection}>
        <div style={styles.container}>
          <div style={styles.whyChooseGrid} className="why-choose-grid">
            <div>
              <h2 style={styles.sectionTitle}>Why Choose Nirvati Herbal?</h2>
              <div style={styles.whyChooseFeatures}>
                <div style={styles.whyChooseFeature}>
                  <div
                    style={{
                      ...styles.whyChooseIcon,
                      backgroundColor: "#dcfce7",
                    }}
                  >
                    <span style={{ color: "#16a34a" }}>🏆</span>
                  </div>
                  <div>
                    <h3 style={styles.whyChooseFeatureTitle}>
                      Certified Quality
                    </h3>
                    <p style={styles.whyChooseFeatureText}>
                      All products are certified by Ayurvedic councils and
                      undergo rigorous quality testing.
                    </p>
                  </div>
                </div>
                <div style={styles.whyChooseFeature}>
                  <div
                    style={{
                      ...styles.whyChooseIcon,
                      backgroundColor: "#dbeafe",
                    }}
                  >
                    <span style={{ color: "#3b82f6" }}>👥</span>
                  </div>
                  <div>
                    <h3 style={styles.whyChooseFeatureTitle}>
                      Expert Consultation
                    </h3>
                    <p style={styles.whyChooseFeatureText}>
                      Get personalized advice from experienced Ayurvedic
                      practitioners.
                    </p>
                  </div>
                </div>
                <div style={styles.whyChooseFeature}>
                  <div
                    style={{
                      ...styles.whyChooseIcon,
                      backgroundColor: "#e0e7ff",
                    }}
                  >
                    <span style={{ color: "#8b5cf6" }}>⚡</span>
                  </div>
                  <div>
                    <h3 style={styles.whyChooseFeatureTitle}>Fast Results</h3>
                    <p style={styles.whyChooseFeatureText}>
                      Experience noticeable improvements within 30 days or get
                      your money back.
                    </p>
                  </div>
                </div>
                <div style={styles.whyChooseFeature}>
                  <div
                    style={{
                      ...styles.whyChooseIcon,
                      backgroundColor: "#fef3c7",
                    }}
                  >
                    <span style={{ color: "#d97706" }}>🕐</span>
                  </div>
                  <div>
                    <h3 style={styles.whyChooseFeatureTitle}>24/7 Support</h3>
                    <p style={styles.whyChooseFeatureText}>
                      Round-the-clock customer support and health guidance
                      available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
                alt="Ayurvedic consultation"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonialsSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
          <p style={styles.sectionSubtitle}>
            Real stories from real people who transformed their health with us
          </p>
          <div style={styles.testimonialsGrid} className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={styles.testimonialCard}
                className="testimonial-card"
              >
                <div style={styles.testimonialHeader}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={styles.testimonialAvatar}
                  />
                  <div>
                    <div style={styles.testimonialName}>{testimonial.name}</div>
                    <div style={styles.testimonialLocation}>
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <div style={styles.testimonialStars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      style={{ color: "#fbbf24", fontSize: "18px" }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <p style={styles.testimonialText}>"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderTest = () => (
    <div style={styles.testSection}>
      <div style={styles.container}>
        {!showTestResults ? (
          <div style={styles.testCard}>
            <div style={styles.testHeader}>
              <h1 style={styles.sectionTitle}>Health Assessment Test</h1>
              <p style={styles.sectionSubtitle}>
                Answer a few questions to get personalized recommendations
              </p>
              <div style={styles.testProgress}>
                <div
                  style={{
                    ...styles.testProgressBar,
                    width: `${
                      ((testStep + 1) / healthQuestions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p
                style={{ color: "#6b7280", fontSize: "14px", marginTop: "8px" }}
              >
                Question {testStep + 1} of {healthQuestions.length}
              </p>
            </div>

            <div>
              <h2 style={styles.testQuestion}>
                {healthQuestions[testStep].question}
              </h2>
              <div style={styles.testOptions}>
                {healthQuestions[testStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleTestAnswer(option)}
                    style={styles.testOption}
                  >
                    <span style={{ fontWeight: "500", color: "#374151" }}>
                      {option}
                    </span>
                    <span style={{ color: "#9ca3af" }}>→</span>
                  </button>
                ))}
              </div>
            </div>

            {testStep > 0 && (
              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <button
                  onClick={() => setTestStep(testStep - 1)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  ← Previous Question
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.testCard}>
            <div style={styles.resultsHeader}>
              <div style={styles.resultsIcon}>✓</div>
              <h1 style={styles.sectionTitle}>Your Health Report</h1>
              <p style={styles.sectionSubtitle}>
                Based on your responses, here are our recommendations
              </p>
            </div>

            {(() => {
              const recommendation = getTestRecommendation();
              return (
                <div>
                  <div style={styles.resultsRecommendation}>
                    <h2
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#1f2937",
                        marginBottom: "16px",
                      }}
                    >
                      {recommendation.title}
                    </h2>
                    <p style={{ color: "#374151", marginBottom: "16px" }}>
                      {recommendation.description}
                    </p>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#16a34a",
                        fontWeight: "600",
                      }}
                    >
                      {recommendation.dosha}
                    </div>
                  </div>

                  <div style={styles.resultsProducts}>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginBottom: "16px",
                      }}
                    >
                      Recommended Products:
                    </h3>
                    <div>
                      {recommendation.products.map((product, index) => (
                        <div key={index} style={styles.resultsProductItem}>
                          <div style={styles.resultsProductLeft}>
                            <span
                              style={{
                                color: "#16a34a",
                                marginRight: "12px",
                                fontSize: "20px",
                              }}
                            >
                              ✓
                            </span>
                            <span
                              style={{ fontWeight: "500", color: "#1f2937" }}
                            >
                              {product}
                            </span>
                          </div>
                          <button style={styles.addToCartButton}>
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.resultsActions}>
                    <button
                      onClick={resetTest}
                      style={styles.secondaryActionButton}
                    >
                      Retake Test
                    </button>
                    <button
                      onClick={() => setIsChatOpen(true)}
                      style={styles.primaryActionButton}
                    >
                      Consult Expert
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.container}>
            <div style={styles.headerContent}>
              <div style={styles.logo}>
                <div style={styles.logoIcon}>🌿</div>
                <div>
                  <h1 style={styles.logoText}>Nirvati Herbal</h1>
                  <p style={styles.logoSubtext}>Ancient Wisdom, Modern Care</p>
                </div>
              </div>

              <nav style={styles.nav} className="nav-desktop">
                <button
                  onClick={() => setActiveSection("home")}
                  style={{
                    ...styles.navButton,
                    ...(activeSection === "home" ? styles.navButtonActive : {}),
                  }}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveSection("test")}
                  style={{
                    ...styles.navButton,
                    ...(activeSection === "test" ? styles.navButtonActive : {}),
                  }}
                >
                  Health Test
                </button>
                <button style={styles.navButton}>Products</button>
                <button style={styles.navButton}>About</button>
                <button style={styles.navButton}>Contact</button>
              </nav>

              <div style={styles.headerActions} className="nav-desktop">
                <span style={{ fontSize: "20px", cursor: "pointer" }}>🔍</span>
                <span style={{ fontSize: "20px", cursor: "pointer" }}>👤</span>
                <div style={{ position: "relative" }}>
                  <span style={{ fontSize: "20px", cursor: "pointer" }}>
                    🛒
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    2
                  </span>
                </div>
                <button
                  onClick={() => setIsChatOpen(true)}
                  style={styles.chatButton}
                >
                  <span>💬</span>
                  <span>Chat</span>
                </button>
              </div>

              <button
                style={styles.mobileMenuButton}
                className="mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
            </div>

            {isMenuOpen && (
              <div
                style={{ padding: "16px 0", borderTop: "1px solid #e5e7eb" }}
              >
                <nav
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveSection("home");
                      setIsMenuOpen(false);
                    }}
                    style={{ ...styles.navButton, textAlign: "left" }}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setActiveSection("test");
                      setIsMenuOpen(false);
                    }}
                    style={{ ...styles.navButton, textAlign: "left" }}
                  >
                    Health Test
                  </button>
                  <button style={{ ...styles.navButton, textAlign: "left" }}>
                    Products
                  </button>
                  <button style={{ ...styles.navButton, textAlign: "left" }}>
                    About
                  </button>
                  <button style={{ ...styles.navButton, textAlign: "left" }}>
                    Contact
                  </button>
                  <button
                    onClick={() => {
                      setIsChatOpen(true);
                      setIsMenuOpen(false);
                    }}
                    style={{ ...styles.chatButton, width: "fit-content" }}
                  >
                    Chat with Expert
                  </button>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main>
          {activeSection === "home" && renderHome()}
          {activeSection === "test" && renderTest()}
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.container}>
            <div style={styles.footerGrid} className="footer-grid">
              <div style={styles.footerSection}>
                <div style={styles.logo}>
                  <div
                    style={{
                      ...styles.logoIcon,
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    🌿
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      Nirvati Herbal
                    </h3>
                    <p
                      style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}
                    >
                      Ancient Wisdom, Modern Care
                    </p>
                  </div>
                </div>
                <p style={{ color: "#9ca3af" }}>
                  Transforming lives through authentic Ayurvedic solutions. Your
                  wellness journey starts here.
                </p>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#374151",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    📘
                  </div>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#374151",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    📷
                  </div>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#374151",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    🐦
                  </div>
                </div>
              </div>

              <div>
                <h4 style={styles.footerTitle}>Quick Links</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <a href="#" style={styles.footerLink}>
                    About Us
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Our Products
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Health Blog
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Testimonials
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Privacy Policy
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Terms & Conditions
                  </a>
                </div>
              </div>

              <div>
                <h4 style={styles.footerTitle}>Health Solutions</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <a href="#" style={styles.footerLink}>
                    Heart Care
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Diabetes Care
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Liver Care
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Kidney Care
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Brain Care
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Immunity Booster
                  </a>
                </div>
              </div>

              <div>
                <h4 style={styles.footerTitle}>Contact Us</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span style={{ color: "#16a34a" }}>📞</span>
                    <span style={{ color: "#9ca3af" }}>+91 98765 43210</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span style={{ color: "#16a34a" }}>✉️</span>
                    <span style={{ color: "#9ca3af" }}>
                      care@nirvatiherbal.com
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <span style={{ color: "#16a34a" }}>📍</span>
                    <span style={{ color: "#9ca3af" }}>
                      123 Wellness Street,
                      <br />
                      Ayurveda Plaza, Mumbai 400001
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "24px" }}>
                  <h5
                    style={{
                      fontWeight: "600",
                      marginBottom: "12px",
                      fontSize: "16px",
                    }}
                  >
                    Business Hours
                  </h5>
                  <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>
                    Mon - Sat: 9:00 AM - 8:00 PM
                    <br />
                    Sun: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.footerBottom}>
              <p style={styles.footerCopyright}>
                © 2025 Nirvati Herbal. All rights reserved. | Certified by
                Ministry of AYUSH
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "24px" }}
              >
                <span style={{ color: "#9ca3af", fontSize: "14px" }}>
                  We Accept:
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div
                    style={{
                      backgroundColor: "#374151",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    VISA
                  </div>
                  <div
                    style={{
                      backgroundColor: "#374151",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    MC
                  </div>
                  <div
                    style={{
                      backgroundColor: "#374151",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    UPI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Chat Widget */}
        {isChatOpen && (
          <div style={styles.chatOverlay}>
            <div style={styles.chatWidget}>
              <div style={styles.chatHeader}>
                <div style={styles.chatHeaderContent}>
                  <div style={styles.chatHeaderIcon}>💬</div>
                  <div>
                    <h3 style={{ fontWeight: "600", margin: 0 }}>
                      Ayurvedic Expert
                    </h3>
                    <p
                      style={{ fontSize: "14px", color: "#a7f3d0", margin: 0 }}
                    >
                      Online now
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={styles.chatMessages}>
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.chatMessage,
                      ...(message.type === "user"
                        ? styles.chatMessageUser
                        : styles.chatMessageBot),
                    }}
                  >
                    <div
                      style={{
                        ...styles.chatBubble,
                        ...(message.type === "user"
                          ? styles.chatBubbleUser
                          : styles.chatBubbleBot),
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div style={styles.chatInput}>
                <div style={styles.chatInputRow}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                    placeholder="Type your message..."
                    style={styles.chatInputField}
                  />
                  <button
                    onClick={handleChatSend}
                    style={styles.chatSendButton}
                  >
                    📤
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    textAlign: "center",
                    margin: "8px 0 0 0",
                  }}
                >
                  Usually replies within minutes
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Floating Chat Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            style={styles.floatingChatButton}
            className="floating-chat-button"
          >
            💬
            <span style={styles.notificationBadge}>1</span>
          </button>
        )}
      </div>
    </>
  );
};

export default NirvatiHerbal;
