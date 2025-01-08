import { generateToken } from "../lib/utils.js";
import Food from "../models/Food.model.js";
import bcrypt from "bcryptjs";
import Patient from "../models/Patient.model.js";
export const createFoodChart = async (req, res) => {
    const { patientId, morningMeal, eveningMeal, nightMeal, staffName } = req.body;
    if(!patientId || !morningMeal || !eveningMeal || !nightMeal || !staffName){
        return res.status(404).json({message : "All Fields are required"})
    }
    try {
      // Validate if the patient exists
      const patientExists = await Patient.findById(patientId);
      if (!patientExists) {
        return res.status(404).json({ message: "Patient not found." });
      }
  
      // Create the food chart
      const newFoodChart = new Food({
        patientId,
        morningMeal,
        eveningMeal,
        nightMeal,
        staffName,
      });
  
      // Save the food chart to the database
      await newFoodChart.save();
  
      res.status(201).json({
        message: "Food chart created successfully.",
        foodChart: newFoodChart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating food chart." });
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
