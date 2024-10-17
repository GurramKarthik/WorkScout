import React from "react";
import "./home.scss";
import developer from "../assets/developer.png";


const category = [1, 2, 3, 4, 5, 6];


const Category = () => {
  return (
    <div id="container1">
    <h1 style={{ marginBottom: "3vmin", justifySelf: "start" }}>
      {" "}
      Jobs Category{" "}
    </h1>
    <div id="jobsCategory">
      {category.slice(0, 5).map((cate, index) => {
        return (
          <div className="Categ" key={index}>
            <img src={developer} alt="developer" />
            <p>Category</p>
          </div>
        );
      })}
      <div className="Categ exploreJobs">
            <img src={developer} alt="developer" />
            <p >Explore <span style={{color:"#4e8397"}} >&#8599;</span> </p>
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