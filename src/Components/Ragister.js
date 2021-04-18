import React, { useState } from "react";
import "./Ragister.css";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

function Ragister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("users")
      .add({
        firstName,
        lastName,
        dob,
        gender,
        aadhar,
        password,
      })
      .then(() => {
        alert("Your message has been submitted👍");
        history.push("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <label>Enter Password</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Ragister;
