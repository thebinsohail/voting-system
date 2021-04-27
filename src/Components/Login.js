import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { useHistory, Link } from "react-router-dom";
import "./Style/Login.css";

function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const isInvalid = password === "" || number === "";

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = number + "@gmail.com";
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
      <label>Enter Mobile Number</label>
      <input
        type="text"
        value={number}
        placeholder=" Mobile Number"
        onChange={(e) => setNumber(e.target.value)}
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
      <p>
        Don't Have Account?{" "}
        <Link to="/ragister">
          <b>Ragister Youreself</b>
        </Link>
      </p>
    </form>
  );
}

export default Login;
