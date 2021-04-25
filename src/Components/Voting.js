import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import "./Style/Voting.css";
function Voting() {
  const [data, setData] = useState([]);
  // const [target, setTarget] = useState();

  useEffect(() => {
    document.title = "Voting";
    firebase
      .firestore()
      .collection("party")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setData(querySnapshot.docs.map((doc) => doc.data()));
        });
      });
    return () => {};
  }, []);
  // async function handleOnclick(doc) {
  //   setTarget(doc.id);
  //   console.log(doc.id);
  //   try {
  //     await db.collection("party").where("id", "==", target).set({
  //       votes: 2,
  //     });
  //   } catch (error) {
  //     console.log("wrong", error);
  //   }
  // }

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
        {data.map((doc) => {
          return (
            <tbody key={doc.id}>
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
                <td>
                  <button
                    // onClick={async () => {
                    //   try {
                    //     await db
                    //       .collection("party")
                    //       .doc("doc/" + doc.id)
                    //       // .where("id", "==", doc.id)
                    //       .update({
                    //         votes: doc.votes + 1,
                    //       });
                    //   } catch (error) {
                    //     // console.log("wrong", error);
                    //     console.log(doc.id);
                    //     console.log(doc);
                    //   }
                    // }}
                    className="button3"
                  >
                    Vote
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Voting;
