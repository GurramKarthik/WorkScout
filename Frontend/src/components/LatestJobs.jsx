import React from "react";
import search from "../assets/search.png";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

// const jobs = [1,2,3,4,5,6,7,8];

const LatestJobs = () => {
  const {allJobs} = useSelector(store => store.job);
  return (
    <div id="JobsSection">
      <h1> Find A <span style={{color:"#4ea5c5"}}>Sutibale Job</span>  here </h1>

      <div id="searchJobs">
        <input
          type="text"
          placeholder="Search Job"
          name="job"
          className="searchBar"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="searchBtn"
        >
          <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
        </svg>
      </div>


    <div id="jobs">
        {
           allJobs.length <=0 ? <span>No Jobs avilable</span> : allJobs.slice(0,6).map((job)=>{
                return <JobCard key={job._id} job={job}/>
            })
        }
    </div >

    </div>
  );
};

export default LatestJobs;
