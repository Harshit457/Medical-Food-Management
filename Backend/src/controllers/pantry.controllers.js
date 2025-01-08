import { generateToken } from "../lib/utils.js";
import Pantry from "../models/Pantry.model.js";
import bcrypt from "bcryptjs";
import Food from "../models/Food.model.js";
import Admin from "../models/AdminModel.js";
import Patient from "../models/Patient.model.js";

export const createPantry = async (req, res) => {
   
    const key = req.user._id;
  const {staffName, contactInfo, emailpantry,passwordpantry, status } = req.body;
  try {
    if (!emailpantry || !passwordpantry || !staffName || !contactInfo || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (passwordpantry.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const pantry = await Pantry.findOne({ emailpantry });

    if (pantry) return res.status(400).json({ message: "Email already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordpantry, salt);
    const newPantry = new Pantry({
        staffName, contactInfo, emailpantry,passwordpantry:hashedPassword, status , key
     
    });

    if (newPantry) {
      
      await newPantry.save();

      res.status(201).json({
        _id: newPantry._id,
        
        emailpantry: newPantry.emailpantry,
        
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
  const { emailpantry, passwordpantry } = req.body;
  try {
    const pantry = await Pantry.findOne({ emailpantry });

    if (!pantry) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(passwordpantry, pantry.passwordpantry);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(pantry._id, res);

    res.status(200).json({
      _id: pantry._id,
     
      emailpantry: pantry.emailpantry,
     
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


export const getPantryDetails = async (req, res) => {
  try {
    // Fetch all patients and their associated food charts
    const foodCharts = await Food.find().populate("patientId", "-__v -key -createdAt -updatedAt");

    res.status(200).json(foodCharts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching pantry details." });
  }
};

