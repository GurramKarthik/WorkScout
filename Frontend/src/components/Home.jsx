import React, { useEffect } from "react";
import NavBar from "./shared/NavBar";
import HeroSection from "./HeroSection";
import Category from "./category";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/Hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs(); // CUSTOM HOOK TO GET ALL JOBS

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "Recruter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div id="home">
      {user && user?.role === "Recruter" ? (
        <></>
      ) : (
        <>
          <NavBar />
          <HeroSection />
          <Category />
          <LatestJobs />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
