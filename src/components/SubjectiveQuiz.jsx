import axios from "axios";
import { useState } from "react";
import { server } from "../constants/config";
import GetPass from "./GetPass";

export default function Quiz({ userEmail, onSubmit }) {
  const [answers, setAnswers] = useState([
    { question: "1. Write one skill you learned today.", answer: "" },
    { question: "2. What was your favorite part of this workshop?", answer: "" },
    { question: "3. How will you use this knowledge in your career?", answer: "" },
    { question: "4. Mention one new concept you learned.", answer: "" },
    { question: "5. Any suggestion for improvement?", answer: "" },
  ]);
  const [result, setResult] = useState("");
  const [passed, setPassed] = useState(false);

  const handleChange = (i, value) => {
    const updated = [...answers];
    updated[i].answer = value;
    setAnswers(updated);
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${server}/subjective`, { email: userEmail, answers });
      setResult(res.data.message);
      setPassed(res.data.passed);
      onSubmit()
    } catch (err) {
      console.log(err)
      setResult("Error submitting quiz");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white shadow p-6 rounded-2xl">
      <h2 className="text-xl font-bold text-center mb-4">✍️  Section 2 – Objective / Short Answer  
</h2>
      {answers.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-semibold mb-1">{q.question}</p>
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            value={q.answer}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
      >
        Submit Quiz
      </button>
      {result && <p className="text-center mt-3 font-medium">{result}</p>}

      {passed && <GetPass email={email} />}
    </div>
  );
}
