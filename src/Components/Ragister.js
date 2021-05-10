import React, { useState, useEffect } from "react";
import "./Style/Ragister.css";
import firebase from "../firebase";
import { useHistory, Link } from "react-router-dom";
import doesAadharExist from "../Services/doesAadharExist";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import doesNumberExist from "../Services/doesNumberExist";

function Ragister() {
  console.log("--------- Ragister!!");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  let history = useHistory();

  const isInvalid =
    firstName === "" ||
    lastName === "" ||
    dob === "" ||
    gender === "" ||
    aadhar === "" ||
    number === "";

  useEffect(() => {
    document.title = "Ragister";
  }, []);

  const handleSubmit = async (e) => {
    console.log("------- handleSubmit!!");
    e.preventDefault();
    setError("");
    setMsg("");
    if (!isInvalid) {
      console.log("Is Valid Phone Number");
      if (isValidPhoneNumber(number)) {
        console.log("Yes Valid Phone Number");
        console.log("Does Aadhar Exist");
        const aadharExists = await doesAadharExist(aadhar);
        const numberExists = await doesNumberExist(number);
        if (!numberExists.length) {
          if (!aadharExists.length) {
            console.log("Aadhar Not Exist");
            try {
              console.log("------- before firebase call!");
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
                })
                .then(() => {
                  console.log("------ after firebase call success!!");
                  alert("Ragistered Successfully👍");
                  history.push("/login");
                });
            } catch (error) {
              setError("error", error);
            }
          } else {
            setError("User Exist");
          }
        } else {
          setError("Number Is Already In Use");
        }
      } else {
        setMsg("Enter Valid Number");
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
        required
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label>Enter Last Name</label>
      <input
        required
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label>Select DOB</label>
      <input
        required
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <label>Select Gender</label>
      <div onChange={(e) => setGender(e.target.value)}>
        <input required type="radio" value="Male" name="gender" /> Male
        <input required type="radio" value="Female" name="gender" /> Female
        <input required type="radio" value="Other" name="gender" /> Other
      </div>

      <label>Enter Aadhar Number</label>
      <input
        required
        type="text"
        placeholder="Aadhar Number"
        value={aadhar}
        onChange={(e) => {
          setError("");
          setAadhar(e.target.value);
          if (e.target.value.length > 12 || e.target.value.length < 12) {
            setError("Aadhar Should Be 12 Digit");
          }
        }}
      />
      <label>Enter Number</label>
      <PhoneInput
        required
        placeholder="Enter phone number"
        defaultCountry="IN"
        value={number}
        onChange={setNumber}
      />
      <p style={{ color: "red" }}>{msg}</p>

      <button className="button2" type="submit">
        Submit
      </button>
      <p>
        Already have a account?
        <Link to="/login">
          <b>Login</b>
        </Link>
      </p>
    </form>
  );
}
export default Ragister;
