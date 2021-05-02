import { useState, useEffect } from "react";
import firebase from "../firebase";

export default function usePartyData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await firebase
        .firestore()
        .collection("party")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(() => {
            setData(querySnapshot.docs.map((doc) => doc.data()));
          });
        });
    }
    fetchData();
    return () => {};
  }, []);

  return { data };
}
