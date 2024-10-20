import React from "react";
import "./Css/Jobs.scss";
import profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

const skills = [1, 2, 3, 4, 5, 6, 7, 8];

const JobCards2 = ({ job }) => {

  const calculateDays = () =>{
      const createdAt = new Date(job?.createdAt)
      const CurrTIme = new Date();
      const timeDiff  = CurrTIme - createdAt;
      const days  = Math.floor( timeDiff / (24*60*60*1000));
      return days;
  }

  const navigate = useNavigate();

  const handleClick = (key) =>{
    navigate(`/get/${key}`)
  }

  return (
    <div id="jobCard" key={job._id} onClick={() => handleClick(job._id)}>
      <div>
        <input type="checkbox" name="apply" />
      </div>

      <div id="right">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div id="profile">
            <p id="profileName">{job?.title}</p>
            <div style={{ display: "flex", gap: "1vmin" }}>
              <p id="companyName"> {job?.company.name}</p>
              <i class="ri-star-fill" style={{ color: "#ffab00" }}></i>
              <p>4.0</p>
            </div>
          </div>
          <div id="ComImg">
            <img src={profile} alt="CompnayImage" />
          </div>
        </div>
        <div id="JobDetails">
          <div style={{ display: "flex", gap: "2vmin" }}>
            <i class="ri-suitcase-line"></i>
            <p> {job?.experienceLevel}</p>
            <p> | </p>
            <p>₹</p>
            <p>{job?.salary} LPA</p>
            <p> | </p>
            <i class="ri-map-pin-line"></i>
            <p>{job?.company?.location}</p>
          </div>

          <div style={{ display: "flex", gap: "2vmin" }}>
            <i class="ri-article-line"></i>
            <p>{job?.description}</p>
          </div>
          <div style={{ display: "flex", gap: "2vmin" }}>
            {job?.requirements?.slice(0, 5).map((skill, index) => {
              return <p key={index}>{skill}</p>;
            })}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p> { calculateDays() === 0 ? "Today" : `${calculateDays()} days ago` }  </p>
          <div style={{ display: "flex", gap: "2vmin" }}>
            <i class="ri-bookmark-line"></i>
            <p>Save</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCards2;
