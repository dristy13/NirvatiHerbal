import React, { useState } from "react";
import "../CSS/TestSection.css";

const TestSection = ({ setActiveSection, setIsChatOpen }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Sample questions
  const questions = [
    {
      id: 1,
      question: "How many hours do you sleep daily?",
      options: [
        { text: "Less than 5", tip: "Try to increase sleep" },
        { text: "5-7", tip: "Average sleep" },
        { text: "7-9", tip: "Good sleep" },
        { text: "More than 9", tip: "Too much sleep may be bad" },
      ],
    },
    {
      id: 2,
      question: "How often do you exercise?",
      options: [
        { text: "Never", tip: "Exercise regularly" },
        { text: "1-2 times/week", tip: "Average activity" },
        { text: "3-5 times/week", tip: "Good routine" },
        { text: "Daily", tip: "Excellent" },
      ],
    },
    {
      id: 3,
      question: "How much water do you drink daily?",
      options: [
        { text: "Less than 1L", tip: "Drink more water" },
        { text: "1-2L", tip: "Average hydration" },
        { text: "2-3L", tip: "Good hydration" },
        { text: "More than 3L", tip: "Great hydration" },
      ],
    },
  ];

  const handleAnswer = (qid, optionText) => {
    setAnswers({ ...answers, [qid]: optionText });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Quiz Results:", answers);
  };

  const progressPercent =
    ((currentQuestion + (submitted ? 1 : 0)) / questions.length) * 100;

  return (
    <section className="test-section">
      <h2>Free Health Assessment</h2>

      {!submitted && (
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {!submitted ? (
        <div className="question-card">
          <p>
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h3>{questions[currentQuestion].question}</h3>
          <div className="options">
            {questions[currentQuestion].options.map((opt) => (
              <button
                key={opt.text}
                className={`option-btn ${
                  answers[questions[currentQuestion].id] === opt.text
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleAnswer(questions[currentQuestion].id, opt.text)
                }
              >
                {opt.text}
                <span className="tip">{opt.tip}</span>
              </button>
            ))}
          </div>

          <div
            className="nav-buttons"
            style={{
              justifyContent:
                currentQuestion < questions.length - 1
                  ? "flex-end"
                  : "space-between",
            }}
          >
            {currentQuestion < questions.length - 1 && (
              <button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
              >
                Next
              </button>
            )}
            {currentQuestion === questions.length - 1 && (
              <button
                onClick={handleSubmit}
                disabled={!answers[questions[currentQuestion].id]}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="submitted-card">
          <h3>Thank you!</h3>
          <p>
            Your health responses have been recorded. Based on your answers, we
            suggest you focus on sleep, hydration, and balanced nutrition.
          </p>
          <button onClick={() => setIsChatOpen(true)}>Consult Expert</button>
          <button
            className="back-home"
            onClick={() => setActiveSection("home")}
          >
            Back to Home
          </button>
        </div>
      )}
    </section>
  );
};

export default TestSection;
