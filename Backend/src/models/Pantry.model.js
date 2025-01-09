import mongoose from "mongoose";
const PantrySchema = new mongoose.Schema({
    staffName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    key:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Admin",
          required: true,
      },
      
  });
const Pantry = mongoose.model("Pantry", PantrySchema);
export default Pantry;
  