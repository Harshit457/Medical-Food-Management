import { generateToken } from "../lib/utils.js";
import Food from "../models/Food.model.js";
import bcrypt from "bcryptjs";
import Patient from "../models/Patient.model.js";
export const createFoodChart = async (req, res) => {
    const { patientId } = req.params; // Extract patientId from params
    const { morningMeal, eveningMeal, nightMeal, staffName } = req.body;
    const AdminId = req.user._id;
    console.log(patientId)
    // Check for required fields
    if (!morningMeal || !eveningMeal || !nightMeal || !staffName || !AdminId) {
      return res.status(400).json({ message: "All fields are required." });
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
        AdminId
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




  export const getFoodByStaffName = async (req, res) => {
    try {
      const { staffName } = req.params;
  
      // Find food charts by staffName and populate the patientId with patient details
      const foodChart = await Food.find({ staffName })
        .populate("patientId", "PatientName Age Gender ContactInformation EmergencyContact RoomNumber BedNumber FloorNumber Diseases Allergies") // Populate patient details
        .exec();
  
      if (!foodChart || foodChart.length === 0) {
        return res.status(404).json({ message: "No food chart found for this staff member" });
      }
  
      res.status(200).json(foodChart);
    } catch (error) {
      console.log("Error retrieving food chart by staffName", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };




  export const getFoodByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
      const foodChart = await Food.find({ patientId });
  
      if (!foodChart || foodChart.length === 0) {
        // Return empty array with a 200 status instead of 404
        return res.status(200).json([]); 
      }
  
      res.status(200).json(foodChart);
    } catch (error) {
      console.log("Error retrieving food chart by patientId", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



  export const updateFood = async (req, res) => {
    try {
     
      const { morningMealStatus, eveningMealStatus, nightMealStatus , id} = req.body; // Meal statuses from the request body
      console.log(id)
      // Validate statuses (only allow valid status values for each meal)
      const validStatuses = ["Pending", "Completed"];
  
      if (
        (morningMealStatus && !validStatuses.includes(morningMealStatus)) ||
        (eveningMealStatus && !validStatuses.includes(eveningMealStatus)) ||
        (nightMealStatus && !validStatuses.includes(nightMealStatus))
      ) {
        return res.status(400).json({ message: "Invalid status value provided" });
      }
  
      // Find the food chart by its unique ID
      const foodChart = await Food.findById(id);
  
      if (!foodChart) {
        return res.status(404).json({ message: "Food chart not found" });
      }
  
      // Update the meal statuses only if they are provided in the request body
      if (morningMealStatus) foodChart.morningMeal.status = morningMealStatus;
      if (eveningMealStatus) foodChart.eveningMeal.status = eveningMealStatus;
      if (nightMealStatus) foodChart.nightMeal.status = nightMealStatus;
  
      // Save the updated food chart
      await foodChart.save();
  
      // Respond with the updated food chart
      res.status(200).json(foodChart);
    } catch (error) {
      console.error("Error updating food chart", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  

      
  
