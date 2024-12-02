import React, { useState } from "react";
import search from "../assets/search.png";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import "./Css/home.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

// const jobs = [1,2,3,4,5,6,7,8];

const LatestJobs = () => {
  
  const {allJobs } = useSelector(store => store.job); 
  const [search, setSearch]  = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = () =>{
      dispatch(setSearchQuery(search));
      navigate("/browse")
  }


  return (
    <div id="JobsSection">
      <h1> Find A <span style={{color:"#4ea5c5"}}>Sutibale Job</span>  here </h1>

      <div id="searchJobs">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search you dream job here!"
          aria-describedby="basic-addon2"
          className="pt-2 pb-2"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
        />
        <Button variant="outline-secondary" id="button-addon1" onClick={handleSearch}  >
            <i class="ri-search-line"></i>
        </Button>
      </InputGroup>

      
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
