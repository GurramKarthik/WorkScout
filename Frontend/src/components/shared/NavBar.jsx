import React, { useState } from "react";
import "../Css/Navbar.scss";
import avatar from "../../assets/avatar.png";
import NavProfile from "./NavProfile.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const NavBar = () => {
  const { user } = useSelector(store => store.auth);
  const [isProfile, setIsProfile] = useState(false);

  const toogleProfile = () => {
    setIsProfile(!isProfile);
  };

  return (
    <div>
      
      <div id="Nav">
      <h2>
        Work<span>Scout</span>
      </h2>
      <div id="navOptions">
        <li><Link to="/" style={{textDecoration:"none", color:"black"}}>Home</Link></li>
        <li><Link to="/jobs" style={{textDecoration:"none", color:"black"}}>Jobs</Link> </li>
        <li><Link to="/browse" style={{textDecoration:"none", color:"black"}}>Browse</Link></li>
        {user ? (
          // If user is logged in
          
          <div id="profilePic">
            <img
              src={avatar}
              alt="profilePic"
              style={{
                width: "2.5vmax",
                height: "2.5vmax",
                borderRadius: "50%",
                cursor:"pointer"

              }}
              onClick={toogleProfile}
            />
          </div>
          
        ) : (
          // If user is not logged in
          <>
            
            <Link to="/login"><button className="navBtnLogin" >Login</button></Link>
            <Link to="/signup"><button className="navBtn"> Sign Up</button></Link>
          </>
        )}
      </div>
    

    </div>
    {isProfile && <NavProfile/>}
   </div>
  );
};

export default NavBar;