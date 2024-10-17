import React from "react";
import "./home.scss";
import avatar from "../assets/avatar.png";
import jobImg from "../assets/jobImg.jpg";
import Category from "./category";


const HeroSection = () => {
  const loggedIn = false;
  const recruter = false;
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
          {!loggedIn ? (
            <div className="jobsBtn">
              <button className="btns" style={{ backgroundColor: "#4e8397" }}>
                {" "}
                Find Jobs &#8594;
              </button>
              <button className="btns"> Post Jobs &#8594;</button>
            </div>
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
        <div id="image">
          <img src={jobImg} alt="image" />
        </div>
      </div>

   
    </div>
  );
};

export default HeroSection;
