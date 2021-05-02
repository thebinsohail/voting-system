import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { useHistory, Link } from "react-router-dom";
import "./Style/Login.css";
import doesNumberExist from "../Services/doesNumberExist";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber } from "react-phone-number-input";

function Login() {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const isInvalid = number === "";
  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    // const email = number + "@gmail.com";
    if (!isInvalid) {
      if (isValidPhoneNumber(number)) {
        // const om = await firebase
        //   .auth()
        //   .signInWithEmailAndPassword(email, password);
        try {
          const labh = await doesNumberExist(number);

          if (labh.length) {
            firebase.auth().useDeviceLanguage();
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
              "recaptcha-container"
            );

            const appVerifier = window.recaptchaVerifier;
            // const num = "+91" + number;

            await firebase
              .auth()
              .signInWithPhoneNumber(number, appVerifier)
              .then(function (e) {
                const code = prompt(
                  "enter the code sent to your mobile number"
                );
                if (code === null) return setError("OTP Is Empty");
                e.confirm(code);
                history.push("/voting");
              });
            // firebase.auth().currentUser.displayName = name;
          } else {
            setError("You Haven't Ragistered With This Number");
          }
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError("Enter Valid Number");
      }
    } else {
      setError("Empty Fields");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Enter Mobile Number</label>
      {/* <input
        type="text"
        value={number}
        placeholder=" Mobile Number"
        onChange={(e) => setNumber(e.target.value)}
      /> */}
      <PhoneInput
        placeholder="Enter phone number"
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
