import React, { useState } from "react";
import firebase from "../firebase";
import doesUidExist from "../Services/doesUidExist";
import "./Style/Voting.css";
import usePartyData from "../Hooks/use-party-data";

function Voting() {
  const [error, setError] = useState("");

  const { data } = usePartyData();

  return (
    <div className="container-voting">
      <table>
        <thead>
          <tr>
            <th>Election Symbol</th>
            <th>Party</th>
            <th>Candidate Name</th>
            <th>Vote</th>
          </tr>
        </thead>
        {data.map(({ id, symbol, party_Name, candidate_name, votes }) => {
          return (
            <tbody key={id}>
              <tr>
                <td>
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      objectFit: "contain",
                    }}
                    src={symbol}
                    alt="symbol"
                  />
                </td>
                <td>{party_Name}</td>
                <td>{candidate_name}</td>
                <td>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      setError("");
                      const uid = firebase.auth().currentUser.uid;
                      const om = doesUidExist(uid);
                      if (!(await om).length) {
                        await firebase
                          .firestore()
                          .collection("party")
                          .doc(id)
                          .update({ votes: votes + 1 });
                        await firebase
                          .firestore()
                          .collection("voted")
                          .add({ voters: uid });
                        setError("Thank You For Youre Valuable Vote");
                      } else {
                        setError("You Can't Vote Twice");
                      }
                    }}
                    className="button3"
                    type="button"
                  >
                    Vote
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      <label style={{ color: "red", fontSize: "x-large" }}>{error}</label>
    </div>
  );
}

export default Voting;
