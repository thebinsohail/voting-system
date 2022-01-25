import React, { useEffect,useState } from "react";
import "./Style/Index.css";
import { Link } from "react-router-dom";
import useAuthListener from "../Hooks/use-auth-listener";
function Index() {
  const { user } = useAuthListener();
  useEffect(() => {
    document.title = "Voting System";
  }, []);

  return (
    <div className="container">
      <div className="left">
        <p>
        Online Voting System Using Web Application
        </p>
        <div className="table">
          <table>
            <caption style={{ fontSize: "x-large", fontWeight: "bolder" }}>
              Group Members
            </caption>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Roll No</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Anas Bin Sohail</td>
                <td>2019-SE-033</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Shaikh Muhammad Abdullah</td>
                <td>1900240191</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Malik Ansari</td>
                <td>2019-SE-038</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Mahad Faisal</td>
                <td>2019-SE-039</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="right">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/8/8d/SSUET_Logo.png"
          alt="votinglogo"
        />
        <h3>Welcome to Voting System</h3>

        <Link to={user ? "/voting" : "/login"}>
          <button className="button1" type="submit">
            Vote Here
          </button>
        </Link>

        <Link to="ragister">
          <button className="button1" type="submit">
            Register Youself
          </button>
        </Link>
        <Link to="result">
          <button className="button1" type="submit">
            Result
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Index;
