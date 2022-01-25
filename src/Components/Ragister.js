import React, { useState, useEffect } from "react";
import "./Style/Ragister.css";
import firebase from "../firebase";
import { useHistory, Link } from "react-router-dom";
import doesAadharExist from "../Services/doesAadharExist";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import doesNumberExist from "../Services/doesNumberExist";

function Ragister() {
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [dob2, setDob2] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setAadhar] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  let history = useHistory();

  const isInvalid =
    firstName === "" ||
    lastName === "" ||
    dob === "" ||
    gender === "" ||
    cnic === "" ||
    number === "";

  useEffect(() => {
    document.title = "Ragister";
  }, []);

  const calculate_age = (dob1) => {
    const today = new Date();
    const birthDate = new Date(dob1);
    let age_now = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    return age_now;
  };

  const handleChange_age = (event) => {
    console.log("DOB:", event.target.value);
    setDob2(event.target.value);
    const age_latest = calculate_age(event.target.value);
    console.log(age_latest);
    setDob(age_latest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("------- handleSubmit!!");
    setError("");
    setMsg("");
    if (!isInvalid) {
      if (dob > "18") {
        console.log("Is Valid Phone Number");
        if (isValidPhoneNumber(number)) {
          console.log("Yes Valid Phone Number");
          console.log("Does CNIC Exist");
          const cnicExists = await doesAadharExist(cnic);
          const numberExists = await doesNumberExist(number);
          if (!numberExists.length) {
            if (!cnicExists.length) {
          
              try {
                console.log("------- before firebase call!");
                await firebase
                  .firestore()
                  .collection("users")
                  .add({
                    firstName,
                    lastName,
                    dob2,
                    gender,
                    cnic,
                    number,
                  })
                  .then(() => {
                    console.log("------ after firebase call success!!");
                    alert("Registered Successfully👍");
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
        setError("Under Age");
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
        name="date_of_birth"
        defaultValue={dob}
        onChange={handleChange_age}
      />

      <label>Select Gender</label>
      <div onChange={(e) => setGender(e.target.value)}>
        <input required type="radio" value="Male" name="gender" /> Male
        <input required type="radio" value="Female" name="gender" /> Female
        <input required type="radio" value="Other" name="gender" /> Other
      </div>

      <label> CNIC Number</label>
      <input
        required
        type="text"
        placeholder="CNIC Number"
        value={cnic}
        onChange={(e) => {
          setError("");
          setAadhar(e.target.value);
          if (e.target.value.length > 12 || e.target.value.length < 12) {
            setError("INVALID CNIC");
          }
        }}
      />
      <label>Enter Number</label>
      <PhoneInput
        required
        placeholder="Enter phone number"
        defaultCountry="PK"
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
