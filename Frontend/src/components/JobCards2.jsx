import React from "react";
import "./Jobs.scss";
import profile from "../assets/profile.png"

const skills = [1,2,3,4,5,6,7,8]

const JobCards2 = () => {
  return (
    <div id="jobCard">
      <div>
        <input type="checkbox" name="apply"/>
      </div>

      <div id="right">

        <div style={{display:"flex", justifyContent:"space-between"}} >
        <div id="profile">
          <p id="profileName">Job Profile Name</p>
          <div style={{ display: "flex", gap: "1vmin" }}>
            <p id="companyName"> Compnay name</p>
            <i class="ri-star-fill" style={{ color: "#ffab00" }}></i>
            <p>4.0</p>
          </div>
        </div>
        <div id="ComImg">
            <img src={profile} alt="CompnayImage" />
        </div>
      </div>
        <div id="JobDetails">
            <div style={{display:"flex" , gap:"2vmin"}}>
                <i class="ri-suitcase-line"></i>
                <p> 0 years</p>
                <p> | </p>
                <p>₹</p>
                <p>12 LPA</p>
                <p> | </p>
                <i class="ri-map-pin-line"></i>
                <p>Bengaluru</p>
            </div>

            <div style={{display:"flex" , gap:"2vmin"}}>
                  <i class="ri-article-line"></i>
                  <p>Required Educational Qualification: BE / BTech/ MTech / MCARequired Skills:</p>
            </div>
            <div style={{display:"flex" , gap:"2vmin"}}>
                {
                  skills.slice(0,5).map((skill, index)=>{
                      return (<p key={index}>skill</p>)
                  })
                }
            </div>
        </div>
        <div style={{display:"flex" , justifyContent:"space-between"}}>
           <p> 3 days ago</p>
           <div style={{display:"flex" , gap:"2vmin"}}>
                <i class="ri-bookmark-line"></i>
                <p>Save</p>

           </div>
        </div>
      </div>
    </div>
  );
};

export default JobCards2;
