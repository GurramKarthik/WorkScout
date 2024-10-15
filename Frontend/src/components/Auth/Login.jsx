import React, {useState} from "react";
import NavBar from "../shared/NavBar";
import "../Css/form.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_END_PONIT } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const  navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(input);
    try {
      
      const res = await axios.post(`${USER_END_PONIT}/login`, input, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      }).catch((error)=>{
// axoius can handle responses only b/w 200 to 299. the responses having success = false is handles in catch block
        toast.error(error.response.data.message || 'An error occurred', {
          position: toast.TOP_RIGHT
        });
    
      })
      
  
      if(res.data.success){
        navigate("/");
        toast.success(res.data.message, {
          position: toast.TOP_RIGHT
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'An error occurred', {
        position: toast.TOP_RIGHT
      });
  
      
    }

  };

  return (
    <div>
      <NavBar />

      <div id="signUp">
        <form id="signUpForm" onSubmit={handleSubmit}>
          <h1>Login</h1>
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

          <div style={{ marginTop: "2vmin" }}>
            <button type="submit"> Login </button>
            <p style={{ textAlign: "center", marginTop: "2vmin" }}>
              Do not have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
