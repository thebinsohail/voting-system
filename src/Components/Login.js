import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { useHistory } from "react-router-dom";

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
        setEmail("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("Empty Fields");
    }
  };
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setMessage("");

  //   try {
  //     await firebase
  //       .firestore()
  //       .collection("users")
  //       .where("aadhar", "==", aadhar)
  //       .where("password", "==", password)
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           setData(querySnapshot.docs.map((doc) => doc.data()));
  //           console.log(doc.id, " => ", doc.data());
  //         });
  //       });
  //   } catch (error) {
  //     setMessage("Something Wrong");
  //   }

  //   data.map((doc) => {
  //     pass = doc.password;
  //     aadh = doc.aadhar;
  //     return { pass, aadh };
  //   });

  //   if (aadh === aadhar && pass === password) {
  //     // setUser(true);
  //     history.push("/voting");
  //   } else {
  //     setMessage("Wrong Login crediential");
  //     // setUser(false);
  //   }
  // }

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
