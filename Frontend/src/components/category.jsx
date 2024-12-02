import React from "react";
import "./Css/home.scss"
import developer from "../assets/developer.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";


const category = [
  "Data Science",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Java Developer",
  "ML Engineer"
];


const Category = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = (search) =>{
      dispatch(setSearchQuery(search));
      navigate("/browse")
  }

  return (
    <div id="container1">
    <h1 style={{ marginBottom: "3vmin", justifySelf: "start" }}>
      {" "}
      Jobs Category{" "}
    </h1>
    <div id="jobsCategory">
      {category.slice(0, 5).map((cate, index) => {
        return (
          <div className="Categ" key={index}  onClick={()=>{handleSearch(cate)}} >
            <img src={developer} alt="developer" />
            <p>{cate}</p>
          </div>
        );
      })}

      <div className="Categ " onClick={()=>{navigate("/jobs")}}>
            <p > ... </p>
      </div>
    </div>
  </div>
  );
};



export default Category


/*
 <div className="Categ">
      <img src={developer} alt="developer" />
      <p>Category</p>
    </div>
*/ 