import React, { useEffect, useState } from "react";
import "./Css/Jobs.scss";
import NavBar from "./shared/NavBar";
import JobCards2 from "./JobCards2";
import Filters from "./Filters";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";



const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  console.log(allJobs)
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  
  console.log(filteredJobs)


   // onleaving the paging setting searched query to null
   const dispatch = useDispatch();
   useEffect(()=>{
    return () =>{
        dispatch(setSearchQuery(""))
    }
},[])


  useEffect(() => {
    if (!searchQuery.location && !searchQuery.profile && !searchQuery.salary) {
        // If no filter is applied, set filteredJobs to allJobs
        setFilteredJobs(allJobs);
    } else {
        // Apply filters only if there's an active filter
        let result = allJobs;

        if (searchQuery.location) {
            result = result.filter((job) => job.location.includes(searchQuery.location));
        }
        if (searchQuery.profile) {
            result = result.filter((job) => job.title.includes(searchQuery.profile));
        }
        if (searchQuery.salary) {
            result = result.filter((job) => job.salaryRange === searchQuery.salary);
        }
        setFilteredJobs(result);
    }
    }, [searchQuery.location, searchQuery.profile, searchQuery.salary, allJobs]);


  
  


  return (
    <div>
      <NavBar />

      <div id="JobPage">
        <div style={{ width: "50%" }}>
          {filteredJobs.length <= 0 ? (
            <p> No Jobs Avilable Right Now</p>
          ) : (
            <>
              {filteredJobs.map((job) => {
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
