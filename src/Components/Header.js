import React from "react";
import "./Style/Header.css";
import firebase from "../firebase";
import { Link, useHistory, useLocation } from "react-router-dom";
import usePartyData from "../Hooks/use-party-data";
import useAuthListener from "../Hooks/use-auth-listener";

function Header() {
  const history = useHistory();
  const location = useLocation();

  const { data } = usePartyData();
  const { user } = useAuthListener();

  const users = firebase.auth().currentUser;
  let name;
  if (users != null) {
    name = users.displayName;
  } else {
    console.log("User Not Available");
  }

  return (
    <nav className="navigation">
      {data.map(({ id, party_Name, votes }) => {
        return (
          <div key={id}>
            <p>
              {party_Name}
              &nbsp;&rarr;&nbsp;
              {votes}
            </p>
          </div>
        );
      })}

      {name ? <label>Hey, {name}</label> : null}

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
    </nav>
  );
}

export default Header;
