import React, { useState, useEffect } from "react";
import "./Style/Ragister.css";
import { firebase } from "../firebase";
import { useHistory, Link } from "react-router-dom";
import doesAadharExist from "../Services/doesAadharExist";

function Ragister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let history = useHistory();
  const isInvalid =
    firstName === "" ||
    lastName === "" ||
    dob === "" ||
    gender === "" ||
    aadhar === "" ||
    number === "" ||
    password === "";

  useEffect(() => {
    document.title = "Ragister";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = number + "@gmail.com";
    setError("");
    if (!isInvalid) {
      const aadharExists = await doesAadharExist(aadhar);
      if (!aadharExists.length) {
        try {
          const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
          console.log();
          await createdUserResult.user.updateProfile({
            displayName: firstName,
          });
          await firebase
            .firestore()
            .collection("users")
            .add({
              firstName,
              lastName,
              dob,
              gender,
              aadhar,
              number,
              password,
              uid: createdUserResult.user.uid,
              email: email,
            })
            .then(() => {
              alert("Ragistered Successfully👍");
              history.push("/voting");
            });
        } catch (error) {
          setError("error", error);
        }
      } else {
        setError("User Exist");
      }
    } else {
      setError("Fields Are Empty");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ color: "red", fontSize: "x-large" }}>{error}</label>
      <label>Enter First Name</label>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label>Enter Last Name</label>
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label>Select DOB</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

      <label>Enter Gender</label>
      <input
        type="text"
        placeholder="Enter Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <label>Enter Aadhar Number</label>
      <input
        type="text"
        placeholder="Aadhar Number"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
      />
      <label>Enter Number</label>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <label>Enter Password</label>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="button2" type="submit">
        Submit
      </button>
      <p>
        Already have a account?{" "}
        <Link to="/login">
          <b>Login</b>
        </Link>
      </p>
    </form>
  );
}

export default Ragister;
