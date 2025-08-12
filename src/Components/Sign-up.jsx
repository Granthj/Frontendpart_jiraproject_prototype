import React, { useState } from 'react';
import { Link } from 'react-router';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
        console.log("Response from server:", result);
      if (response.ok) {
        setMessage(`✅ Signup successful! Welcome, ${result.name || formData.name}`);
        setFormData({ name: "", email: "", password: "" });
      } 
      else {
        setMessage(`❌ Error: ${result.message || "Signup failed"}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("❌ Network error. Please try again.");
    }
  };
return (

    <>
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Signup</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
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
          Signup
        </button>
      </form>
            <Link to="/Login" className="d-block text-center mt-3">
                Go to Login
            </Link>
    </div>

    </>
)
}
export default SignUp;