
import  express from "express";
import {createPatient,getAllPatients, getPatientById} from "../controllers/Patient.controllers.js";
const router = express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";

router.post('/patient',protectRoute, createPatient);
router.get('/patient',protectRoute, getAllPatients);
router.get('/patient/:id',protectRoute, getPatientById);

export default router;