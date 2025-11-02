import React, { useState } from "react";
import { server } from "../constants/config";

const RegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    branch: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${server}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      onRegister(formData.email);
    } else {
      alert("Registration failed or user already exists");
    }
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-black-700">
          🎓  Workshop / Event Registration Page – upDate

        </h2>
        <h3 className="font-bold text-2xl m-2">📜 Welcome to the Event! </h3>
        <p className="mb-5">Join our interactive workshop & earn your <b>Participation Certificate</b> instantly after completing the quiz. Fill out the form below 👇 </p>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full mb-4 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
          className="w-full mb-4 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          onChange={handleChange}
          required
          className="w-full mb-6 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="college"
          placeholder="College"
          type="text"
          onChange={handleChange}
          required
          className="w-full mb-6 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="course"
          placeholder="Course"
          type="text"
          onChange={handleChange}
          required
          className="w-full mb-6 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="branch"
          placeholder="Branch"
          type="text"
          onChange={handleChange}
          required
          className="w-full mb-6 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
