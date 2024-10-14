import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  let { fullName, email, phoneNumber, password, role } = req.body;
  // if all details not entered
  if (!fullName || !email || !phoneNumber || !password || !role) {
    return res.status(400).json({
      message: "Enter all the details required....",
      success: false,
    });
  }

  // if user already exits
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User Already Exists",
      success: false,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // create a user in database
  await User.create({
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    password: hashedPassword,
    role: role,
  })
    .then(() => {
      return res.status(200).json({
        message: "Account created Successfully",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      // error in adding user to database
      return res.status(500).json({
        message:
          "Sorry!!, We encountered a problem in registering you. Please try again later.",
        success: false,
      });
    });
};

export const Login = async (req, res) => {
  let { email, password, role } = req.body;

  try {
    //All details did not enter
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Enter all the details required",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    //email not found
    if (!user) {
      return res.status(400).json({
        message: "Incorrecct Email or password",
        success: false,
      });
    }

    // emaill found and comparing passwords
    const isPasswordMath = await bcrypt.compare(password, user.password);
    if (!isPasswordMath) {
      return res.status(400).json({
        message: "Incorrecct Email or password",
        success: false,
      });
    }

    //user exisits and checking the role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exisits with current role",
        success: false,
      });
    }

    // all details  are correct get a token for user.
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      }) /*maxAge: 1*24*60*60*1000: The cookie will expire after 1 day (24 hours). 1*24*60*60*1000 is the number of milliseconds in 1 day. httpOnly: true: The cookie is only accessible via HTTP requests (not JavaScript), which improves security. sameSite: "strict": The cookie is only sent in requests originating from the same site, preventing cross-site request forgery (CSRF) attacks.*/
      .json({
        message: "Logged in Successfully",
        user,
        success: true,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message:
        "Sorry!!, We encountered a problem while logging in you. Please try again later.",
      success: false,
    });
  }
};

export const LogOut = async (req, res) => {
  try {
    
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out successfully",
      success: true,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).cookie("token", "", { maxAge: 0 }).json({
      message:
        "Sorry!!. Couldn't loggout successfully. Please rephresh the page.",
      success: true,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    //email and role can't be changed
    let { fullName, phoneNumber, bio, skills } = req.body;
    let file = req.file;

    //cloudenary come here

    //conerting skills from string to array
    let skillArray = [];
    if (skills) {
      skillArray = skills.split(",");
    }
    const userId = req.userId; //middelware authentaction. getting Id from cookie token
    let user = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        phoneNumber,
        profile: {
          bio: bio,
          skills: skillArray,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );

    // Checking id user is present or not beacuse Data Integrity: The token may be valid, but the corresponding user might no longer exist in the database (e.g., if the user was deleted or their account was deactivated). Ensuring the user exists helps maintain data integrity
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // //updateing data
    // if (fullName) user.fullName = fullName;
    // if (phoneNumber) user.phoneNumber = phoneNumber;
    // if (bio) user.profile.bio = bio;
    // if (skills) user.profile.skills = skillArray;

    // code for resume Update

    // await user.save();

    user = {
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfuly",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Sorry!!. Couldn't update the profile.",
      success: true,
    });
  }
};
