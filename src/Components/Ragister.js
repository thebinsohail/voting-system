import React, { useState, useEffect } from "react";
import "./Style/Ragister.css";
import firebase from "../firebase";
import { useHistory, Link } from "react-router-dom";
import doesAadharExist from "../Services/doesAadharExist";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber } from "react-phone-number-input";

function Ragister() {
  console.log('--------- Ragister!!');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [number, setNumber] = useState("");
  // const [password, setPassword] = useState("");
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
    console.log('------- handleSubmit!!');
    e.preventDefault();
    // const email = number + "@gmail.com";
    setError("");
    setMsg("");
    if (!isInvalid) {
      if (isValidPhoneNumber(number)) {
        const aadharExists = await doesAadharExist(aadhar);
        if (!aadharExists.length) {
          try {
            // const createdUserResult = await firebase.auth().createUser(number);
            // .createUserWithEmailAndPassword(email, password);
            // console.log();
            // await createdUserResult.user.updateProfile({
            //   displayName: firstName,
            // });
            console.log('------- before firebase call!');
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
                // password,
                // uid: createdUserResult.user.uid,
                // email: email,
              })
              .then(() => {
                console.log('------ after firebase call success!!');
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

      <label>Select Gender</label>
      <div onChange={(e) => setGender(e.target.value)}>
        <input type="radio" value="Male" name="gender" /> Male
        <input type="radio" value="Female" name="gender" /> Female
        <input type="radio" value="Other" name="gender" /> Other
      </div>

      <label>Enter Aadhar Number</label>
      <input
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
        placeholder="Enter phone number"
        value={number}
        onChange={setNumber}
      />
      <p>{msg}</p>

      {/* <input
        type="text"
        placeholder="Enter Mobile Number"
        value={number}
        onChange={(e) => {
          setError("");
          setNumber(e.target.value);
          if (e.target.value.length > 10 || e.target.value.length < 10) {
            setError("Number Should Be 10 Digit");
          }
        }}
      /> */}

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
