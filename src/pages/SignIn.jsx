import React, { useState } from "react";
import { signInManager } from "../app";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("test-user");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const manager = await signInManager({ username, password });
    localStorage.setItem("manager", JSON.stringify(manager));
    alert(`Welcome, ${manager.fullName}`);
    navigate("/jobs");
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="signin">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;