import express from "express"
import { Login, Register, updateProfile } from "../controllers/user.conrtoller";

const router = express.router();

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/profile/update").post(updateProfile)

