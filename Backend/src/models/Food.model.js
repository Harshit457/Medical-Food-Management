import mongoose from "mongoose";
const FoodChartSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    AdminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin"},
    morningMeal: {
      ingredients: [String],
      instructions: String,
      status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    },
    eveningMeal: {
      ingredients: [String],
      instructions: String,
      status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
    },
    nightMeal: {
      ingredients: [String],
      instructions: String,
      status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
    },
    staffName: { type: String, required: true },
    
  });
const Food = mongoose.model("Food",FoodChartSchema);
export default Food;