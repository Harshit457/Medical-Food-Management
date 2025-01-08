import express from "express";
import { createFoodChart ,getFoodByPatientId,getFoodByStaffName} from "../controllers/food.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/createFoodChart/:patientId", protectRoute, createFoodChart);
router.get("/Staff/:staffName",getFoodByStaffName);
router.get("/:patientId",getFoodByPatientId);
export default router;
