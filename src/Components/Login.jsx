import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${process.env.backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // ✅ Store email & customerId in context
        setUser({
          email: result.email,
          customerId: result.customerId
        });

        setMessage("✅ Login successful!");
        setFormData({ email: "", password: "" });

        navigate(`/user-dashboard/${result.email}`);
      } else {
        setMessage(`❌ Error: ${result.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("❌ Network error. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <Link to="/signup" className="d-block text-center mt-3">
        Go to Signup
      </Link>
    </div>
  );
};

export default Login;
