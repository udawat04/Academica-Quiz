import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirecting

const StudentLoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  

  // Single useState for all form fields
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
if (!isOpen) return null;
  // Handles input for any field
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handles the login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Adjust URL as needed:
      const res = await axios.post("http://localhost:5000/user/login", {
        email: form.email,
        password: form.password,
      });
      console.log(res,"result")
      localStorage.setItem("user",JSON.stringify(res.data.user))
    
      alert("User Logged In Successfully")
      navigate("/dashboard"); 
    } catch (err) {
      setError("Invalid email or password");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-3 cursor-pointer text-4xl font-bold text-gray-600"
        >
          ×
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <img
              src="https://images.unsplash.com/photo-1672248652488-73f8a07e3307?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmaWNlJTIwd29tYW4lMjB1c2luZyUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Login Visual"
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">Welcome To Your</h2>
            <h1 className="text-2xl font-bold text-blue-900">
              Academica Online
            </h1>
            <p className="mt-2 text-sm text-gray-600">Digital Campus</p>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <h3 className="text-3xl font-semibold mt-5 mb-10 text-blue-900">
              Student Login
            </h3>
            <form onSubmit={handleLogin}>
              <label className="text-sm font-medium text-gray-700">
                Email ID / Form ID
              </label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-2 border rounded mt-1 mb-4"
                placeholder="e.g., prajjaldhar@academica.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="w-full px-4 py-2 border rounded mt-1 mb-4"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500 mb-3 cursor-pointer">
                Forgot Password?
              </p>
              {error && (
                <div className="text-red-600 text-xs mb-2">{error}</div>
              )}
              <button
                className="bg-[#0B2450] w-full text-white py-2 rounded-full cursor-pointer font-semibold"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "SUBMIT"}
              </button>
            </form>
            <button className="mt-4 cursor-pointer border border-[#0B2450] w-full text-[#0B2450] py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:text-white hover:bg-[#0B2450]">
              🎁 Refer & Earn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginModal;
