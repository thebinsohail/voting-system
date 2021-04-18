import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  let history = useHistory();

  // useEffect(() => {
  //   return db.collection("users").onSnapshot((snapshot) => {
  //     setData(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  // const handleSubmit = () => {
  //   {
  //     data.map((data) => {
  //       if (data.aadhar === aadhar && data.password === password) {
  //         console.log("succcess");
  //         history.push("/voting");
  //       } else {
  //         console.log("unsuccess");
  //       }
  //       return alert("done");
  //     });
  //   }
  // };
  useEffect(() => {
    db.collection("users")
      .where("aadhar", "==", aadhar)
      .where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setData(querySnapshot.docs.map((doc) => doc.data()));
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return () => {};
  }, [aadhar, password]);

  const handleSubmit = () => {
    if (data.exist) {
      if (data.aadhar === aadhar && data.password === password) {
        console.log("succcess");
        history.push("/voting");
      } else {
        console.log("unsuccess");
      }
    } else {
      console.log("wrong cred");
    }

    // console.log(data.aadhar);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Enter Aadhar Number</label>
        <input
          type="text"
          value={aadhar}
          placeholder="Aadhar Number"
          onChange={(e) => setAadhar(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Enter Password</label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  );
}

export default Login;
