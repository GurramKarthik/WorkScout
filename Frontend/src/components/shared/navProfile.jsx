import React from "react";
import "../Css/Navbar.scss";
import avatar from "../../assets/avatar.png";
import logout from "../../assets/logout.png";
import profile from "../../assets/profile.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_END_PONIT } from "../utils/constants";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const NavProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_END_PONIT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null)); // removing user in frontend side.
        toast.success(res.data.message, {
          position: toast.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.TOP_CENTER,
      });
    }
  };

  return (
    <div id="navProfile">
      <div className="navProfileOptions">
        {user?.profile?.profilePhoto && (
          <img
            src={user?.profile?.profilePhoto}
            style={{
              width: "2.5vmax",
              height: "2.5vmax",
              borderRadius: "50%",
            }}
          />
        )}

        <div>
          <p style={{textTransform:"uppercase", textAlign:"center"}}>{user?.fullName}</p>
        </div>
      </div>

      <hr/>
      {user && user.role === "Candidate" ? (
        <>
          <div className="navProfileOptions">
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
            >
              <p> <i class="ri-user-line"></i> View profile </p>
            </Link>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="navProfileOptions">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <p onClick={logoutHandler}>
            <i class="ri-logout-box-r-line"></i> logout
          </p>
        </Link>{" "}
      </div>
    </div>
  );
};

export default NavProfile;
