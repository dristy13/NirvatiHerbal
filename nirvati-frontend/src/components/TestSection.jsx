import React, { useState } from "react";

// Props: setActiveSection, setIsChatOpen
const TestSection = ({ setActiveSection, setIsChatOpen }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "How often do you feel tired?",
      options: ["Always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "Do you have sleep issues?",
      options: ["Yes", "Occasionally", "No"],
    },
    {
      id: 3,
      question: "Do you follow a healthy diet?",
      options: ["Yes", "Sometimes", "No"],
    },
  ];

  const handleAnswerChange = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = () => {
    console.log("Test Submitted:", answers);
    setSubmitted(true);
  };

  return (
    <section style={{ padding: "40px 20px" }}>
      <h2>Free Health Test</h2>
      {!submitted ? (
        <div>
          {questions.map((q) => (
            <div key={q.id} style={{ marginBottom: "24px" }}>
              <p>{q.question}</p>
              <div style={{ display: "flex", gap: "12px" }}>
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    style={{
                      padding: "8px 12px",
                      border:
                        answers[q.id] === opt
                          ? "2px solid #16a34a"
                          : "1px solid #e5e7eb",
                      borderRadius: "8px",
                      background: answers[q.id] === opt ? "#dcfce7" : "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAnswerChange(q.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 24px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Submit Test
          </button>
        </div>
      ) : (
        <div>
          <h3>Thank you! Your results will be analyzed by our expert.</h3>
          <button onClick={() => setIsChatOpen(true)}>
            Consult Expert Now
          </button>
          <button onClick={() => setActiveSection("home")}>Back to Home</button>
        </div>
      )}
    </section>
  );
};

export default TestSection;
