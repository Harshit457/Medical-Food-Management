import Patient from "../models/Patient.model.js";
import Admin from "../models/AdminModel.js";
// Create a new patient
export const createPatient = async (req, res) => {
    const key = req.user._id;
    try {
        const { PatientName, Diseases, Allergies, RoomNumber
            , BedNumber
            , FloorNumber,Age,Gender,ContactInformation,EmergencyContact,
          } = req.body;
        
          if (!PatientName || !Diseases || !Allergies || !RoomNumber || !BedNumber || !FloorNumber || !Age || !Gender || !ContactInformation, !EmergencyContact) {
            return res.status(400).json({ message: "All fields are required" });
          }
        // Create the patient document
        const newPatient = new Patient({
            PatientName, Diseases, Allergies, RoomNumber
          , BedNumber
          , FloorNumber,Age,Gender,ContactInformation,EmergencyContact,key,
          });

        // Save to database
        await newPatient.save();

        res.status(201).json({ message: "Patient created successfully.", newPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Server error occurred." });
    }
};

// Get all patients
export const getAllPatients = async (req, res) => {
    try {
        const reqid = req.user._id;
        const patientList = await Patient.find().where('key').equals(reqid);
        res.status(200).json(patientList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a patient by ID
export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




