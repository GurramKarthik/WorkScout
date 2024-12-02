import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/signUp";
import { ToastContainer } from "react-toastify";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/profile";
import JobDetails from "./components/JobDetails";
import Company from "./components/Admin/Company";
import AdminHome from "./components/Admin/AdminHome";
import CompanyDetails from "./components/Admin/companyDetails";
import AdminJob from "./components/Admin/AdminJob";
import AdminNewJob from "./components/Admin/AdminNewJob";
import JobApplications from "./components/Admin/JobApplications";
import Application from "./components/Application";


const appRouter  = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/applications",
    element:<Application/>
  },
  {
    path:"/get/:jobId",
    element:<JobDetails/>
  }, 
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  }, 
  // admin end points
  {
    path:"/admin",
    element:<AdminHome/>
  },
  {
    path:"/admin/companies",
    element:<Company/>
  },
  {
    path:"/admin/company/:companyId",
    element:<CompanyDetails/>
  }, 
  {
    path:"/admin/job",
    element:<AdminJob/>
  }, 
  {
    path:"/admin/job/new",
    element:<AdminNewJob/>
  }, 
  {
    path:"/admin/job/:id/applicants",
    element:<JobApplications/>
  }, 
])


function App() {

  return (
    <div>
      <RouterProvider router={appRouter}/>
      <ToastContainer/>

    </div>
  );
}

export default App;
