import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import "./Voting.css";
function Voting() {
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "Voting";
  }, []);

  useEffect(() => {
    db.collection("party")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setData(querySnapshot.docs.map((doc) => doc.data()));
        });
      });
    return () => {};
  }, []);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Election Symbol</th>
            <th>Party</th>
            <th>Candidate Name</th>
            <th>Vote</th>
          </tr>
        </thead>
        {data.map((doc) => {
          return (
            <tbody key={doc._id}>
              <tr>
                <td>
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      objectFit: "contain",
                    }}
                    src={doc.symbol}
                    alt="symbol"
                  />
                </td>
                <td>{doc.party_Name}</td>
                <td>{doc.candidate_name}</td>
                <button className="button3">Vote</button>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Voting;
