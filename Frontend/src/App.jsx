import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/signUp";
import { ToastContainer } from "react-toastify";


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
