import { generateToken } from "../lib/utils.js";
import Admin from "../models/AdminModel.js";
import bcrypt from "bcryptjs";
import Food from "../models/Food.model.js";
import Patient from "../models/Patient.model.js";
export const signup = async (req, res) => {
  const {email, password} = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const admin = await Admin.findOne({ email });

    if (admin) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
     
      email,
      password: hashedPassword,
     
    });

    if (newAdmin) {
      // generate jwt token here
      generateToken(newAdmin._id, res);
      await newAdmin.save();

      res.status(201).json({
        _id: newAdmin._id,
        
        email: newAdmin.email,
        
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(admin._id, res);

    res.status(200).json({
      _id: admin._id,
     
      email: admin.email,
     
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

export const getAdminDetails = async (req, res) => {
  const { adminId } = req.user; // Assume adminId is extracted from the authenticated user's token

  try {
    // Fetch patients created by this admin
    const patients = await Patient.find({ key: adminId }).select("-__v -key -createdAt -updatedAt");

    // Fetch food charts for these patients
    const foodCharts = await Food.find({ patientId: { $in: patients.map((p) => p._id) } }).populate(
      "patientId",
      "-__v -key -createdAt -updatedAt"
    );

    res.status(200).json({
      patients,
      foodCharts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching admin details." });
  }
};
