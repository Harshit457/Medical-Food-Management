import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    PatientName: {
      type: String,
      required: true,
      unique: true,
    },
    Diseases: {
      type: String,
      required: true,
    },
    Allergies: {
      type: String,
      required: true,
    },
    RoomNumber: {
      type: Number,
      default: "",
    },
    BedNumber: {
        type: Number,
        required: true
    },
    FloorNumber: {
        type: Number,
        required:true
    },
    Age: {
        type: Number,
        required: true
    },
    Gender: {
      type: String,
      required: true
    },
    ContactInformation: {
      type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format validation
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
    },
    EmergencyContact: {
      type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format validation
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
    },
    key:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      
  }

  },
  
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;
