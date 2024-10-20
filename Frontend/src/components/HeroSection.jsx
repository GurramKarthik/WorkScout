import React from "react";
import "./Css/home.scss";
import avatar from "../assets/avatar.png";
import jobImg from "../assets/jobImg.jpg";
import Category from "./category";
import { useSelector } from "react-redux";


const HeroSection = () => {
  const {user} = useSelector(store => store.auth)
  const loggedIn = user ? true : false;
  const recruter = user && user.role === 'Recruter';

  return (
    <div>
      <div id="main1">
        <div id="content">
          <h1>
            Connecting <span className="highlightText">talent</span> <br /> with{" "}
            <span style={{ color: "#4e8397" }}>opportunity</span>{" "}
          </h1>

          <p>
            Don't just wait for opportunities to knock <span> &#8594; </span>{" "}
            take control of your career today by exploring and applying for jobs
            that align with your goals, skills, and passion. Your next big
            opportunity could be just one click away!
          </p>
          
          <div className="jobsBtn">

          {!loggedIn ? (
            <>
              <button className="btns" style={{ backgroundColor: "#4e8397" }}>
                {" "}
                Find Jobs &#8594;
              </button>
              <button className="btns"> Post Jobs &#8594;</button>
              </>
          ) : (
            <>
              {recruter ? (

                <button className="btns"> Post Jobs &#8594; </button>
              ) : (
                <button className="btns" style={{ backgroundColor: "#4e8397" }}>
                  {" "}
                  Find Jobs &#8594;
                </button>
              )}
            </>
          )}
            </div>

        </div>
        <div id="image">
          <img src={jobImg} alt="image" />
        </div>
      </div>

   
    </div>
  );
};

export default HeroSection;
