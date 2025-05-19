import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Fake registration logic
    if (email && password) {
      localStorage.setItem("userEmail", email); // ✅ Save email to localStorage
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleRegister}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already registered? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
