import React, { useState, useEffect } from "react";
import "./Style/Result.css";
import usePartyData from "../Hooks/use-party-data";
import firebase from "../firebase";

function Result() {
  const [currentDate, setCurrentDate] = useState("");
  const [firebaseDate, setFirebaseDate] = useState([]);

  const { data } = usePartyData();
  let fullDate;

  useEffect(() => {
    document.title = "Result";
    console.log("Result useEffect called");
    const today = new Date(),
      date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    setCurrentDate(date);
    console.log(date);

    return () => {};
  }, [currentDate]);

  useEffect(() => {
    async function fetchData() {
      console.log("Result Fetch Data called");
      console.log("Before result firebase called");
      await firebase
        .firestore()
        .collection("resultDate")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(() => {
            setFirebaseDate(querySnapshot.docs.map((doc) => doc.data()));
          });
        });
      console.log("after result firebase called");
    }
    fetchData();
    return () => {};
  }, []);
  firebaseDate.map(({ dates }) => {
    fullDate = dates;
    return console.log(fullDate);
  });

  return (
    <>
      {currentDate === fullDate ? (
        <div className="container-voting">
          <table>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Party Symbol</th>
                <th>Party Name</th>
                <th>Votes</th>
              </tr>
            </thead>
            {data.map(({ id, party_Name, votes, symbol }) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td>{id}</td>
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
                    <td>{votes}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        <p>Result will be Declare On {fullDate}</p>
      )}
    </>
  );
}

export default Result;
