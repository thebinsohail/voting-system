import React from "react";
import "./Style/Header.css";
import firebase from "../firebase";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuthListener from "../Hooks/use-auth-listener";

function Header() {
  const history = useHistory();
  const location = useLocation();

  const { user } = useAuthListener();

  const users = firebase.auth().currentUser;
  let name;
  if (users != null) {
    name = users.displayName;
  }

  return (
    <nav className="navigation">
      <div className="left">
        <Link to="/">
          <button className="button" type="button">
            Home
          </button>
        </Link>
        <Link to="result">
          <button
            style={{ marginLeft: "10px" }}
            className="button"
            type="button"
          >
            Result
          </button>
        </Link>
      </div>
      <div className="right">
        {name ? <label className="userName">Hey, {name}</label> : null}

        {user ? (
          <button
            type="button"
            onClick={() => {
              console.log("Logout Clicked");
              firebase.auth().signOut();
              console.log("Logout Successfully");
              history.push("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
