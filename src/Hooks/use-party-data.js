import { useState, useEffect } from "react";
import firebase from "../firebase";

export default function usePartyData() {
  console.log("usePartyData");

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetch Data called");
      console.log("Before firebase called");
      await firebase
        .firestore()
        .collection("party")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(() => {
            setData(querySnapshot.docs.map((doc) => doc.data()));
          });
        });
      console.log("after firebase called");
    }
    fetchData();
    return () => {};
  }, []);

  return { data };
}
