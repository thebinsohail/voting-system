import React, { useContext } from "react";
import "./Style/Header.css";
import UserContext from "../Context/user";
import { firebase } from "../firebase";
import { Link, useHistory } from "react-router-dom";
function Header() {
  const history = useHistory();
  const { user } = useContext(UserContext);
  return (
    <nav className="navigation">
      {user ? (
        <button
          type="button"
          onClick={() => {
            firebase.auth().signOut();
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
