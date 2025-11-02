import React, { useState } from "react";
import axios from "axios";
import { server } from "../constants/config";

const ObjectiveQuiz = ({ userEmail, onPassed }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const questions = [
    {
      id: 1,
      question: "Which of the following best defines “Workshop”?",
      options: ["Group learning session", "Festival event", "Sports competition", "None of these"],
      correct: "Group learning session",
    },
    {
      id: 2,
      question: "What is the main purpose of attending a workshop?",
      options: ["Networking", "Practical Learning", "Certification only", "None"],
      correct: "Practical Learning",
    },
    {
      id: 3,
      question: "Which platform is best for professional networking?",
      options: ["Instagram", "YouTube", "LinkedIn", "Facebook"],
      correct: "LinkedIn",
    },
    {
      id: 4,
      question: "What does “BFSI” stand for?",
      options: ["Banking, Finance, and Insurance", "Banking, Financial Services & Insurance", "Business, Finance, and Investments", "None"],
      correct: "Banking, Financial Services & Insurance",
    },
    {
      id: 5,
      question: "upDate Education mainly focuses on:",
      options: [
        "Gaming",
        "Online Courses & HR",
        "Travel",
        "Entertainment",
      ],
      correct: "Online Courses & HR",
    },
  ];
  const handleAnswer = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate score
    let newScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) newScore++;
    });

    setScore(newScore);
    setSubmitted(true);

    // ✅ Send score to backend
    try {
      const res = await axios.post(`${server}/objective`,
        {
          email: userEmail,
          score: newScore,

        });
      if (res.data) {
        setMessage(
          newScore >= 3
            ? "✅ You passed the quiz! Proceed to the next section."
            : "❌ You failed the quiz. Try again later."
        );

        if (newScore >= 3) {
          // Move to subjective quiz if passed
          setTimeout(() => {
            onPassed();
          }, 1500);
        }
      }
    } catch (err) {
      console.error("Error submitting score:", err);
      setMessage("⚠️ Error submitting score. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">📘 Section 1 – MCQ Questions
      </h2>
      <p className="pb-3">(Select the correct answer for each)
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((q) => (
            <div key={q.id} className="mb-5">
              <p className="font-semibold mb-2">
                {q.id}. {q.question}
              </p>
              {q.options.map((option) => (
                <label key={option} className="block mb-1">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleAnswer(q.id, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-full"
          >
            Submit Quiz
          </button>
        </form>
      ) : (
        <div className="text-center mt-4">
          <p className="text-lg font-semibold">
            Your Score: {score} / {questions.length}
          </p>
          <p className="mt-2">{message}</p>
        </div>
      )}
    </div>
  );
};

export default ObjectiveQuiz;













