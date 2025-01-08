import { generateToken } from "../lib/utils.js";
import Pantry from "../models/Pantry.model.js";
import bcrypt from "bcryptjs";

export const createPantry = async (req, res) => {
    const key = req.user._id;
  const {staffName, contactInfo, email,password, status } = req.body;
  try {
    if (!email || !password || !staffName || !contactInfo || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const pantry = await Admin.findOne({ email });

    if (pantry) return res.status(400).json({ message: "Email already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newPantry = new Pantry({
        staffName, contactInfo, email,password, status , key
     
    });

    if (newPantry) {
      // generate jwt token here
      generateToken(newPantry._id, res);
      await newPantry.save();

      res.status(201).json({
        _id: newPantry._id,
        
        email: newPantry.email,
        
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginPantry = async (req, res) => {
  const { email, password } = req.body;
  try {
    const pantry = await Pantry.findOne({ email });

    if (!pantry) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(pantry._id, res);

    res.status(200).json({
      _id: pantry._id,
     
      email: pantry.email,
     
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
