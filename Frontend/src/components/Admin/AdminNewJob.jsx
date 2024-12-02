import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import "./AdminJobs.scss";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux";
import { combineSlices } from "@reduxjs/toolkit";
import { JOB_END_POINT } from "../utils/constants";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const AdminNewJob = () => {
  const { allCompanies } = useSelector((store) => store.company);
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: "",
    companyId: null,
  });

  const [companyDropdownHook, setCompanyDropdownHook]  = useState("")

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmitHandiler = async (e) => {
    e.preventDefault();
    setLoading(true)
    // console.log(input);
    try {
      const res = await axios.post(`${JOB_END_POINT}/post`, input, {
        "headers":{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message, {
          position:toast.TOP_RIGHT
        })
        navigate("/admin/job")
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position:toast.TOP_RIGHT
      })
    }finally{
      setLoading(false)
    }

  };

  return (
    <div>
      <NavBar />
      <div id="AdminJobsPage">
        <form id="container" onSubmit={onSubmitHandiler}>
          <h3 style={{ textAlign: "center" }}> Post a New job</h3>
          {
            allCompanies.length==0 && ( <p style={{color:"red", text:"bold", textAlign:"center"}}> *Please Create company to post a job</p> )
          }
          <div className="title">
            <p>Job Title:</p>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={inputHandler}
            />
          </div>

          <div className="container2">
            <div style={{ flexGrow: "1" }}>
              <p>Description:</p>
              <textarea
                name="description"
                value={input.description}
                onChange={inputHandler}
                rows={10}
              ></textarea>
            </div>
            <div style={{ flexGrow: "1" }}>
              <p>Requirments:</p>
              <textarea
                name="requirements"
                value={input.requirements}
                onChange={inputHandler}
                rows={10}
              ></textarea>
            </div>
          </div>
          <div className="container2">
            <div style={{ flexGrow: "1" }}>
              <p>Job Type:</p>
              <input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={inputHandler}
              />
            </div>
            <div style={{ flexGrow: "1" }}>
              <p> Position: </p>
              <input
                type="text"
                name="position"
                value={input.position}
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="container2">
            <div style={{ flexGrow: "1" }}>
              <p>Salary:</p>
              <input
                type="number"
                name="salary"
                value={input.salary}
                onChange={inputHandler}
              />
            </div>
            <div style={{ flexGrow: "1" }}>
              <p>Experience Level:</p>
              <input
                type="text"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={inputHandler}
              />
            </div>
            <div style={{ flexGrow: "1" }}>
              <p>Location:</p>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={inputHandler}
              />
            </div>
          </div>

          <div>
            <DropdownButton
              style={{justifySelf:"center"}}
              id="dropdown-Secondary-button"
              title={
                input.companyId ? (
                  <> 
                    {companyDropdownHook}
                  </>
                ) : (
                  <> Select Company </>
                )
              }
            >
              {allCompanies.map((company) => {
                return (
                  <Dropdown.Item 
                    key={company._id}
                    onClick={() => {
                      setCompanyDropdownHook(company.name)
                      input.companyId=company._id
                    }}
                  >
                    {company.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </div>

          {
            allCompanies.length==0 ? (
              <></>
            ) : (
              <>
              {
                loading ?
                 (<>
                    <button type="button">
                     <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      </button>
                 </>) :
                (
                  <button type="submit" > Create Job </button>

                )
              }
              </>
            )
          }

        </form>
      </div>
    </div>
  );
};

export default AdminNewJob;
