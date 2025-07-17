import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft } from "../Animation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.error);

      navigate("/dashboard", {
        state: { user: data.user },
      });
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
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

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
          className="w-full p-3 mb-6 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          Log In
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
