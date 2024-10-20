import React from "react";
import "./Css/Jobs.scss";
import NavBar from "./shared/NavBar";
import JobCards2 from "./JobCards2";
import Filters from "./Filters";
import { useSelector } from "react-redux";

const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <NavBar />

      <div id="JobPage">
        <div style={{ width: "50%" }}>
          {allJobs.length <= 0 ? (
            <p> No Jobs Avilable Right Now</p>
          ) : (
            <>
              {allJobs.map((job) => {
                return <JobCards2 key={job?._id} job={job} />;
              })}
            </>
          )}
        </div>

        <div style={{ width: "40%" }}>
          <div style={{ display: "flex", gap: "2vmin", alignItems: "center" }}>
            <h3>You can Apply Upto 5 jobs at a single Click!!</h3>
            <button id="applyBtn">Apply</button>
          </div>
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
