import React from "react";
import "./Jobs.scss";
import NavBar from "./shared/NavBar";
import JobCards2 from "./JobCards2";
import Filters from "./Filters";

const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <NavBar />

      <div id="JobPage">
        <div style={{width:"50%"}}> 
          {jobs.map((job, index) => {
            return <JobCards2 key={index}  />;
          })}
        </div>

        <div style={{width:"40%"}}>
          <div style={{ display: "flex", gap: "2vmin" , alignItems:"center"}}>
            <h3>You can Apply Upto 5 jobs at a single Click!!</h3>
            <button id="applyBtn">Apply</button>
          </div>
          <Filters/>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
