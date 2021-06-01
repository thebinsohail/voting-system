import React from "react";
import "./Style/Index.css";
import { Link } from "react-router-dom";
import useAuthListener from "../Hooks/use-auth-listener";
function Index() {
  const { user } = useAuthListener();

  return (
    <div className="container">
      <div className="left">
        <p>
          Topic Name: An Efficient and Securable Online Voting System Using Web
          Application
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
                <th>Enrollment No.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Om B. Adde</td>
                <td>1900240192</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Manthan S. Sakhare</td>
                <td>1900240191</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Vishal P. Pawar</td>
                <td>1900240193</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Sahil Chaturkar</td>
                <td>1800240073</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Shahnawaz Khan</td>
                <td>1900240192</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="right">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/220px-Emblem_of_India.svg.png"
          alt="votinglogo"
        />
        <h3>Welcome to Aadhaar-Voting</h3>

        <Link to={user ? "/voting" : "/login"}>
          <button className="button1" type="submit">
            Vote Here
          </button>
        </Link>

        <Link to="ragister">
          <button className="button1" type="submit">
            Ragister Youself
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
