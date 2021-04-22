import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  let history = useHistory();
  let pass;
  let aadh;
  useEffect(() => {
    db.collection("users")
      .where("aadhar", "==", aadhar)
      .where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setData(querySnapshot.docs.map((doc) => doc.data()));
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [aadhar, password]);

  function handleSubmit() {
    if (aadh === aadhar) {
      if (pass === password) {
        console.log("login success");
        history.push("/voting");
      }
    } else {
      setMessage("Wrong Login crediential");
    }
  }
  {
    data.map((doc) => {
      pass = doc.password;
      aadh = doc.aadhar;

      return console.log("yes");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Enter Aadhar Number</label>
        <input
          type="text"
          // value={aadhar}
          placeholder="Aadhar Number"
          onChange={(e) => setAadhar(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Enter Password</label>
        <input
          type="password"
          // value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <label>{message}</label>
      <button className="button2">Login</button>
    </form>
  );
}

export default Login;
