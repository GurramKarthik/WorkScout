import React, { useState, useEffect, useRef } from "react";
import "../Css/Navbar.scss";
import NavProfile from "./NavProfile.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_END_PONIT } from "../utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import profile from "../../assets/profile.png";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const token = getCookie("token");

const NavBar = () => {

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {}, [user]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_END_PONIT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));  // removing user in frontend side.
        toast.success(res.data.message, {
          position: toast.TOP_CENTER,
        });
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <div id="Nav">
        <h2>
          Work<span>Scout</span>
        </h2>

        <div id="navOptions">
          {user && user.role === "Recruter" ? (
            <>
              <li>
                <Link
                  to="/admin"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/companies"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Company
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/job"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Jobs
                </Link>{" "}
              </li>
            </>
          ) : (
            <div style={{ textDecoration: "none", color: "black", display:"flex", gap:"2vmin"}}>
              <li onClick={() =>{navigate("/")}} >Home </li>
              <li onClick={() =>{navigate("/jobs")}} > Jobs </li>
              <li onClick={() =>{navigate("/browse")}} >  Browse </li>
              <li onClick={() =>{navigate("/applications")}} > Application </li>
            </div>
          )}

          {token ? (
            // If user is logged in

            <div id="profilePic">
              <Dropdown>
                <Dropdown.Toggle variant="">
                  <img
                    src={
                      user?.profile?.profilePhoto
                        ? user?.profile?.profilePhoto
                        : profile
                    }
                    style={{
                      width: "2.5vmax",
                      height: "2.5vmax",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>{user?.fullName}</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <i className="ri-user-line"></i> View profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>
                    <i className="ri-logout-box-r-line"></i> logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            // If user is not logged in
            <>
              <Link to="/login">
                <button className="navBtnLogin">Login</button>
              </Link>
              <Link to="/signup">
                <button className="navBtn"> Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default NavBar;
