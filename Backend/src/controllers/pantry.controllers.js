import { generateTokend } from "../lib/utils.js";
import Pantry from "../models/Pantry.model.js";
import bcrypt from "bcryptjs";
import Food from "../models/Food.model.js";
import Admin from "../models/AdminModel.js";


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

    const pantry = await Pantry.findOne({ email });

    if (pantry) return res.status(400).json({ message: "Email already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newPantry = new Pantry({
        staffName, contactInfo, email,password:hashedPassword, status , key
     
    });

    if (newPantry) {
      
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
    const admin = await Pantry.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokend(admin._id, res);

    res.status(200).json({
      _id: admin._id,
      staffName: admin.staffName,
      email: admin.email,
     
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
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


export const getDistinctStaffNames = async (req, res) => {
  console.log("hello")
  try {
    // Use the distinct method to get unique staff names
    const staffNames = await Pantry.distinct("staffName");

    // Respond with the array of distinct staff names
    res.status(200).json(staffNames);
  } catch (error) {
    console.error("Error fetching distinct staff names", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

