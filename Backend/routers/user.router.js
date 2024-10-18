import express from "express"
import { Login, LogOut, Register, updateProfile } from "../controllers/user.conrtoller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();


// end points of user
router.route("/register").post(singleUpload, Register)
router.route("/login").post(Login)
router.route("/profile/update").put( singleUpload, isAuthenticated, updateProfile)
router.route("/logout").get(isAuthenticated, LogOut)

// api call will be from 
// http://localhost:8000/api/v1/user/register
// http://localhost:8000/api/v1/user/login
// http://localhost:8000/api/v1/user/profile/update
// http://localhost:8000/api/v1/user/logout

export default router;