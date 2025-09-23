import React, { useState } from "react";

const TestSection = ({ setActiveSection, setIsChatOpen }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "How often do you feel tired?",
      options: [
        { text: "Always", tip: "Consider improving your sleep routine." },
        { text: "Sometimes", tip: "Maintain a balanced diet and exercise." },
        { text: "Rarely", tip: "Good! Keep up your healthy habits." },
      ],
    },
    {
      id: 2,
      question: "Do you have sleep issues?",
      options: [
        { text: "Yes", tip: "Try relaxation techniques before bed." },
        { text: "Occasionally", tip: "Maintain consistent sleep schedule." },
        { text: "No", tip: "Excellent sleep habits!" },
      ],
    },
    {
      id: 3,
      question: "Do you follow a healthy diet?",
      options: [
        { text: "Yes", tip: "Great! Keep eating nutritious meals." },
        { text: "Sometimes", tip: "Try adding more vegetables and fruits." },
        { text: "No", tip: "Consider consulting a nutritionist." },
      ],
    },
    {
      id: 4,
      question: "How often do you exercise?",
      options: [
        { text: "Daily", tip: "Excellent, maintain your routine!" },
        {
          text: "1-3 times/week",
          tip: "Try increasing your activity gradually.",
        },
        { text: "Rarely", tip: "Start with light exercises or walking." },
      ],
    },
    {
      id: 5,
      question: "How much water do you drink daily?",
      options: [
        { text: "2-3 liters", tip: "Great, stay hydrated!" },
        { text: "1-2 liters", tip: "Try drinking more water." },
        { text: "<1 liter", tip: "Hydration is important for health." },
      ],
    },
  ];

  const handleAnswer = (qid, optionText) => {
    setAnswers({ ...answers, [qid]: optionText });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Quiz Results:", answers);
  };

  const progressPercent =
    ((currentQuestion + (submitted ? 1 : 0)) / questions.length) * 100;

  return (
    <section
      style={{
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "24px",
          fontWeight: 600,
        }}
      >
        Free Health Assessment
      </h2>

      {/* Progress Bar */}
      {!submitted && (
        <div
          style={{
            background: "#e5e7eb",
            borderRadius: "12px",
            overflow: "hidden",
            height: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: "linear-gradient(to right, #16a34a, #4ade80)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      )}

      {!submitted ? (
        <div
          style={{
            background: "#fff",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: "#6b7280",
              marginBottom: "16px",
            }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
            {questions[currentQuestion].question}
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {questions[currentQuestion].options.map((opt) => (
              <button
                key={opt.text}
                onClick={() =>
                  handleAnswer(questions[currentQuestion].id, opt.text)
                }
                style={{
                  padding: "14px 20px",
                  borderRadius: "12px",
                  border:
                    answers[questions[currentQuestion].id] === opt.text
                      ? "2px solid #16a34a"
                      : "1px solid #d1d5db",
                  background:
                    answers[questions[currentQuestion].id] === opt.text
                      ? "#dcfce7"
                      : "#f9fafb",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: 500,
                  transition: "all 0.2s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#dcfce7")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    answers[questions[currentQuestion].id] === opt.text
                      ? "#dcfce7"
                      : "#f9fafb")
                }
              >
                {opt.text}
                <span
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "#4b5563",
                    marginTop: "4px",
                  }}
                >
                  {opt.tip}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent:
                currentQuestion < questions.length - 1
                  ? "flex-end"
                  : "space-between",
              marginTop: "24px",
            }}
          >
            {currentQuestion < questions.length - 1 && (
              <button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
                style={{
                  background: "linear-gradient(to right, #16a34a, #4ade80)",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.2s",
                  opacity: answers[questions[currentQuestion].id] ? 1 : 0.5,
                }}
              >
                Next
              </button>
            )}

            {currentQuestion === questions.length - 1 && (
              <button
                onClick={handleSubmit}
                disabled={!answers[questions[currentQuestion].id]}
                style={{
                  background: "linear-gradient(to right, #16a34a, #4ade80)",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.2s",
                  opacity: answers[questions[currentQuestion].id] ? 1 : 0.5,
                }}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "#f0fdf4",
            padding: "32px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ fontSize: "1.75rem", marginBottom: "16px" }}>
            Thank you!
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "#4b5563",
              marginBottom: "24px",
            }}
          >
            Your health responses have been recorded. Based on your answers, we
            suggest you focus on sleep, hydration, and balanced nutrition.
          </p>
          <button
            onClick={() => setIsChatOpen(true)}
            style={{
              background: "linear-gradient(to right, #16a34a, #4ade80)",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              marginRight: "16px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Consult Expert
          </button>
          <button
            onClick={() => setActiveSection("home")}
            style={{
              background: "#fff",
              color: "#16a34a",
              padding: "14px 28px",
              borderRadius: "12px",
              border: "1px solid #16a34a",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              marginTop: "16px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Back to Home
          </button>
        </div>
      )}
    </section>
  );
};

export default TestSection;
