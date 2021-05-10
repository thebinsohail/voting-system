import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { useHistory, Link } from "react-router-dom";
import "./Style/Login.css";
import doesNumberExist from "../Services/doesNumberExist";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

function Login() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  useEffect(() => {
    document.title = "Login";
  }, []);
  const handleLogin = async (event) => {
    console.log("------- handleSubmit!!");
    event.preventDefault();
    localStorage.clear("authUser");
    setError("");
    console.log("Is Valid Number");
    if (isValidPhoneNumber(number)) {
      console.log("Yes Valid Number");
      try {
        console.log("Is Valid Aadhar");
        const labh = await doesNumberExist(number);
        console.log("Yes Valid Aadhar");

        if (labh.length) {
          console.log("Before Recapcha called");
          firebase.auth().useDeviceLanguage();
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container"
          );
          const appVerifier = window.recaptchaVerifier;
          console.log("Recapcha called success");
          console.log("------- before firebase call for signinwithnumber");
          await firebase
            .auth()
            .signInWithPhoneNumber(number, appVerifier)
            .then(function (e) {
              const code = prompt("enter the code sent to your mobile number");
              if (code === null) return setError("OTP Is Empty");
              e.confirm(code);
            })
            .then(function () {
              firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {
                  // User is signed in.
                  await user.updateProfile({
                    displayName: name,
                  });
                  history.push("/voting");
                } else {
                  // No user is signed in.
                  console.log("No user is signed in");
                }
              });
            });
          console.log("------- After firebase call for signinwithnumber");
        } else {
          setError("You Haven't Ragistered With This Number");
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Enter Valid Number");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Enter First Name</label>
      <input
        type="text"
        value={name}
        placeholder="Enter First Name"
        onChange={(e) => setName(e.target.value)}
      />

      <label>Enter Mobile Number</label>
      <PhoneInput
        placeholder="Enter phone number"
        defaultCountry="IN"
        value={number}
        onChange={setNumber}
      />

      <div id="recaptcha-container"></div>

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
