import React, { useState, useEffect, useRef } from "react";
import NavBar from "../shared/NavBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { COMPANY_END_POINT } from "../utils/constants";
import useGetCompanyByID from "@/Hooks/useGetCompanyByID";
import { setSingleCompany } from "@/redux/companySlice";
import { setLoading } from "@/redux/authSlice";

const CompanyDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  useGetCompanyByID(params.companyId);

  var { singleCompany } = useSelector((store) => store.company);
  var { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({});

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.logo || null,
      });
    }
  }, [singleCompany]);

  const onInputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onLogoChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // to choose file. when button is clicked then input should trigger.
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const onSubmitHandiler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
        formData.append("file", input.file);
      }

      const response = await axios.put(
        `${COMPANY_END_POINT}/update/${singleCompany._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: toast.TOP_RIGHT,
        });
        console.log("success daat");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.TOP_RIGHT,
      });
    }

    navigate("/admin/companies");
  };

  return (
    <div>
      <NavBar />


      <form style={{ width: "100%", paddingTop:"18vmin" }} onSubmit={onSubmitHandiler} >
        <div id="detailPage">
          <button
            type="button"
            id="cancle"
            onClick={() => navigate("/admin/companies")}
          >
            {" "}
            <i className="ri-arrow-left-line"></i> back
          </button>
          <div id="photoSide">
            <div id="photo">
              <button type="button" onClick={handleButtonClick} id="camBtn">
                <i className="ri-camera-2-line"></i>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onLogoChangeHandler}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </button>
              <img src={singleCompany.logo} />
            </div>
          </div>
          <div id="updateSide">
            <div>
              <h1 style={{ textAlign: "center" }}> {singleCompany.name}</h1>
              <p style={{ margin: "2vmin" }}>
                {" "}
                You can edit the company detials.
              </p>
            </div>

            <div className="detailsInput">
              <p> Name: </p>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={onInputChangeHandler}
                placeholder="Google"
              />
            </div>

            <div className="detailsInput">
              <p> Description: </p>
              <textarea
                name="description"
                onChange={onInputChangeHandler}
                placeholder="We are MNC"
                rows={5}
                value={input.description}
              ></textarea>
            </div>

            <div className="detailsInput">
              <p> website URL: </p>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={onInputChangeHandler}
                placeholder="https://www.google.com"
              />
            </div>

            <div className="detailsInput" style={{ alignItems: "self-start" }}>
              <p> location: </p>
              <textarea
                name="location"
                onChange={onInputChangeHandler}
                placeholder="New York"
                rows={5}
                value={input.location}
              ></textarea>
            </div>

            
              <div>
                <button type="submit" id="submit" > Submit Company Details </button>
              </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;
