import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  // const [user, setUser] = useState(false);

  const history = useHistory();
  let pass;
  let aadh;

  useEffect(() => {
    document.title = "Login";
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      await db
        .collection("users")
        .where("aadhar", "==", aadhar)
        .where("password", "==", password)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setData(querySnapshot.docs.map((doc) => doc.data()));
            console.log(doc.id, " => ", doc.data());
          });
        });
    } catch (error) {
      setMessage("Something Wrong");
    }

    data.map((doc) => {
      pass = doc.password;
      aadh = doc.aadhar;
      return { pass, aadh };
    });

    if (aadh === aadhar && pass === password) {
      // setUser(true);
      history.push("/voting");
    } else {
      setMessage("Wrong Login crediential");
      // setUser(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Enter Aadhar Number</label>
        <input
          type="text"
          value={aadhar}
          placeholder="Aadhar Number"
          onChange={(e) => setAadhar(e.target.value)}
        />
      </div>
      <div>
        <label>Enter Password</label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <label style={{ color: "red", fontSize: "x-large" }}>{message}</label>
      <button className="button2">Login</button>
    </form>
  );
}

export default Login;
