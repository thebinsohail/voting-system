import React from "react";
import "./Index.css";

import { Link } from "react-router-dom";

function Index() {
  // const handleLogin = () => {};
  // const handleRagister = () => {};
  return (
    <div className="container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/220px-Emblem_of_India.svg.png"
        alt="votinglogo"
      />
      <h3>Welcome to Aadhaar-Voting</h3>
      <Link to="/login">
        <button>Vote Here!</button>
      </Link>
      <Link to="/ragister">
        <button>Ragister Youself</button>
      </Link>
    </div>
  );
}

export default Index;
