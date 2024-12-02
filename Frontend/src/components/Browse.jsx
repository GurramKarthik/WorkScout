import React, { useEffect } from "react";
import JobCard from "./JobCard";
import NavBar from "./shared/NavBar";
import JobCards2 from "./JobCards2";
import "./Css/home.scss"
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAllJobs from "@/Hooks/useGetAllJobs";
import { setSearchQuery } from "@/redux/jobSlice";


const Browse = () => {

  useGetAllJobs();
  const {allJobs} = useSelector(store=> store.job)
  const dispatch = useDispatch();
  // onleaving the paging setting searched query to null
  useEffect(()=>{
      return () =>{
          dispatch(setSearchQuery(""))
      }
  },[])

  return (
    <div style={{color:"#383838"}}>
      <NavBar />
      <div id="browse" style={{marginTop:"10vmin", padding:"0vmin 5vmin"}}>
        <h2 style={{textAlign:"center", marginBottom:"5vmin"}}>Search Results ({allJobs.length})</h2>
        <div id="jobs" style={{display:"flex" , width:"100%"}}>
          {allJobs.slice(0, 6).map((job, index) => {
            return <JobCards2 key={index} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
