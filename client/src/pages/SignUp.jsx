import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInLeft } from "../Animation";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Call API to register
    try {
      const res = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error);

      console.log(data.status);
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
      className="min-h-screen flex flex-col items-center justify-start bg-gray-100"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-3xl mt-40"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          minLength={6}
          className="w-full p-3 mb-6 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          Create Account
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span className="text-green-600 hover:underline cursor-pointer">
            Log in
          </span>
        </p>
      </form>
    </motion.div>
  );
}

export default SignUp;
