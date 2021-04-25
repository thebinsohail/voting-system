import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { useHistory } from "react-router-dom";
import "./Style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const isInvalid = password === "" || email === "";

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!isInvalid) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        history.push("/voting");
      } catch (error) {
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("Empty Fields");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Enter Email Address</label>
      <input
        type="email"
        value={email}
        placeholder=" Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Enter Password</label>
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label style={{ color: "red", fontSize: "x-large" }}>{error}</label>
      <button className="button2">Login</button>
    </form>
  );
}

export default Login;
