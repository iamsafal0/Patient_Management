import React from "react";
import "../Home/Home.css";
import {Link} from "react-router-dom"

const Home = () => {

  return (
    <div className="home">
      <h1>Welcome To Wellness <span>Clinic</span></h1>
      <Link to="/dashboard">
      <button>Explore Patient's Details</button>
      </Link>
    </div>
  );
};

export default Home;
