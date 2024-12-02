import React, { useState } from "react";
import NavBar from "./shared/NavBar";
import "./Css/profile.scss";
import Application from "./Application";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { USER_END_PONIT } from "./utils/constants";
import {setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";

const application = [1, 2, 3, 4];

const Profile = () => {
  const { user } = useSelector(store => store.auth);
  const [loading, setLoading] = useState(false)
  const dispatcher = useDispatch();

  const [edit, setEdit] = useState(false);

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    bio: user?.profile?.bio || "",
    phoneNumber: user?.phoneNumber || "",
    skills: user?.profile?.skills?.toString() || "",
    profilePhoto: user?.profile?.profilePhoto || "",
    file: user?.profile?.resume || "",
  });

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const fileChangeHandler = (e) =>{
    const file = e.target.files?.[0];
    setInput({...input, file})
  }
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log("details")
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      console.log("file present")  
      formData.append("file", input.file);
    }else{
      console.log("file not present")  
    }


    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    

    try {
      const response = await axios.put(
        `${USER_END_PONIT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatcher(setUser(response.data.user));
        toast.success(response.data.message, {
          position: toast.BOTTOM_RIGHT,
        });

        setInput({...user})

        handleEdit();
      }else{
        console.log("error in subminting")
      }
    } catch (error) {
      console.log(error);
      toast.success(error, {
        position: toast.BOTTOM_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />

      <div id="profilePage">
        <div id="profileCard">
          {!edit ? (
            // Not editing
            <>
              <div id="header">
                <div id="HeaderLeft">
                  <div id="profileImg">
                    <img src={user?.profile?.profilePhoto} alt="profile Pic" />
                  </div>
                  <div className="prifileName">
                    <h2>{user?.fullName || ""}</h2>
                    <p>{user?.profile?.bio || ""}</p>
                  </div>
                </div>
                <div>
                  <button id="editBtn" onClick={handleEdit}>
                    <i class="ri-pencil-fill"></i>
                  </button>
                </div>
              </div> 
              <div id="otherDetails">
                <div className="details">
                  <i class="ri-mail-fill"></i>
                  <p>{user?.email || ""}</p>
                </div>
                <div className="details">
                  <i class="ri-phone-fill"></i>
                  <p>{user?.phoneNumber || ""}</p>
                </div>

                {user?.profile?.skills.length > 0 ? (
                  <div style={{ marginTop: "2vmin" }}>
                    <h3>Skills</h3>
                    <div id="skills">
                      {user?.profile?.skills.map((skill, index) => {
                        return (
                          <div id="skill" key={index}>
                            {skill || "" }
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  style={{ marginTop: "2vmin", display: "flex", gap: "2vmin" }}
                >
                  <h3>Resume: </h3>
                  <a href={user?.profile?.resume} target="blank" style={{ textDecoration: "none", fontSize: "3vmin" }}>
                    {user?.profile?.resumeOriginalName || "NA"}
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <form id="form" onSubmit={handleUpdateProfile}>
                <h3>Edit Your Profile</h3>
                <div className="formDetails">
                  <label htmlFor="fullName"> Full Name: </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={input.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="formDetails">
                  <label htmlFor="bio"> Bio : </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="formDetails">
                  <label htmlFor="email"> Email: </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="formDetails">
                  <label htmlFor="phoneNumber"> Phone Number: </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="formDetails">
                  <label htmlFor="skills"> Skills : </label>
                  <textarea
                    id="skills"
                    name="skills"
                    value={input.skills}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="formDetails">
                  <label htmlFor="file"> Resume : </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    id="file"
                    name="file"
                    onChange={fileChangeHandler}
                  />
                </div>

                {/* <div className="formDetails">
                  <label htmlFor="profilePhoto"> Profile Pic: </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="profilePhoto"
                    name="profilePhoto"
                    value={input.profilePhoto}
                    onChange={fileChangeHandler}
                  />
                </div> */}

                <div  style={{display:"flex", alignSelf: "center", gap:"3vmin"}} >

                {loading ? (
                  <button id="formBtn">
                    <ClipLoader color="#3498db" size={50} />
                  </button>
                ) : (
                  <button id="saveBtn" type="submit">
                    {" "}
                    Save
                  </button>
                )}

                <button onClick={ ()=>{setEdit(false)} } id="saveBtn"  style={{backgroundColor:"#eb4746"}}>
                    Cancle
                  </button>
                  </div>
              </form>
            </>
          )}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "3vmin",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Applications Applied</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;