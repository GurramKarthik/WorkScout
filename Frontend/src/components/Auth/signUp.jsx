import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import "../Css/form.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_END_PONIT } from "../utils/constants.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { ClipLoader } from "react-spinners";

const SignUp = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleProfilePic = (event) => {
    setInput({ ...input, file: event.target.file?.[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(input)
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios
        .post(`${USER_END_PONIT}/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .catch((error) => {
          // axoius can handle responses only b/w 200 to 299. the responses having success = false is handles in catch block
          toast.error(error.response.data.message || "An error occurred", {
            position: toast.TOP_RIGHT,
          });
        });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message, {
          position: toast.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <NavBar />

      <div id="signUp">
        <form id="signUpForm" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="signEle">
            <label htmlFor="fullName">Full Name:</label>
            <input
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={input.fullName}
              name="fullName"
              onChange={handleInputChange}
            />
          </div>
          <div className="signEle">
            <label htmlFor="Email">Email:</label>
            <input
              id="Email"
              type="email"
              placeholder="hello@gmail.com"
              value={input.email}
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="signEle">
            <label htmlFor="Phone">Phone Number: </label>
            <input
              id="Phone"
              type="text"
              placeholder="8377425341"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={handleInputChange}
            />
          </div>
          <div className="signEle">
            <label htmlFor="Password">Password :</label>
            <input
              id="Password"
              type="password"
              placeholder="Password"
              value={input.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4vmin",
            }}
          >
            <div style={{ display: "flex" }}>
              <input
                id="candidate"
                type="radio"
                className="radio"
                value="Candidate"
                name="role"
                checked={input.role === "Candidate"}
                onChange={handleInputChange}
              />

              <label htmlFor="candidate"> Candidate</label>
            </div>
            <div style={{ display: "flex", gap: 0 }}>
              <input
                id="recruter"
                type="radio"
                className="radio"
                value="Recruter"
                name="role"
                checked={input.role === "Recruter"}
                onChange={handleInputChange}
              />
              <label htmlFor="recruter"> Recruter</label>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2vmin",
            }}
          >
            <label htmlFor="profilePic"> Profile Photo: </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleProfilePic}
            />
          </div>

          <div>
            {loading ? (
              <button id="formBtn">
                <ClipLoader color="#3498db" size={50} />
              </button>
            ) : (
              <button id="formBtn" type="submit"> Sign Up</button>
            )}
            <p style={{ textAlign: "center" }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
