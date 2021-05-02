import React, { useContext } from "react";
import "./Style/Header.css";
import UserContext from "../Context/user";
import firebase from "../firebase";
import { Link, useHistory } from "react-router-dom";
import usePartyData from "../Hooks/use-party-data";

function Header() {
  const history = useHistory();

  const { user } = useContext(UserContext);
  const { data } = usePartyData();

  return (
    <nav className="navigation">
      <div>
        {data.map(({ id, party_Name, votes }) => {
          return (
            <div key={id}>
              <p>
                {party_Name}
                {votes}
              </p>
            </div>
          );
        })}
      </div>

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
