import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/signUp";
import { ToastContainer } from "react-toastify";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/profile";


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
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
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
