import React from "react";
import JobCard from "./JobCard";
import NavBar from "./shared/NavBar";
import JobCards2 from "./JobCards2";
import "./home.scss"


const jobs = [1, 2, 3];
const Browse = () => {
  return (
    <div style={{color:"#383838"}}>
      <NavBar />
      <div id="browse" style={{marginTop:"10vmin", padding:"0vmin 5vmin"}}>
        <h2 style={{textAlign:"center", marginBottom:"5vmin"}}>Search Results ({jobs.length})</h2>
        <div id="jobs" style={{display:"flex" , width:"100%"}}>
          {jobs.slice(0, 6).map((job, index) => {
            return <JobCards2 key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
