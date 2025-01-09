import express from "express";
import { createFoodChart ,getFoodByPatientId,getFoodByStaffName , updateFood} from "../controllers/food.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { pantryprotectRoute } from "../middlewares/pantry.middleware.js";
const router = express.Router();
const eitherProtectRoute = async (req, res, next) => {
  try {
    // First, attempt to use protectRoute
    await new Promise((resolve, reject) => {
      protectRoute(req, res, (err) => {
        if (err) return reject(err); // Reject the promise if there's an error
        resolve(); // Resolve the promise if protectRoute passes
      });
    });

    return next(); // If protectRoute succeeds, proceed to the next middleware
  } catch (error) {
    console.log("protectRoute failed, trying pantryProtectRoute");

    // If protectRoute fails, try pantryProtectRoute
    try {
      await new Promise((resolve, reject) => {
        pantryprotectRoute(req, res, (err) => {
          if (err) return reject(err); // Reject the promise if there's an error
          resolve(); // Resolve the promise if pantryprotectRoute passes
        });
      });

      return next(); // If pantryprotectRoute succeeds, proceed to the next middleware
    } catch (pantryError) {
      console.log("pantryProtectRoute also failed");
      // If both middlewares fail, return an error
      return res.status(401).json({ message: "Unauthorized access" });
    }
  }
};

router.post("/createFoodChart/:patientId", protectRoute, createFoodChart);
router.get("/Staff/:staffName",eitherProtectRoute,getFoodByStaffName);
router.get("/:patientId",eitherProtectRoute,getFoodByPatientId);
router.post("/update",eitherProtectRoute,updateFood);
export default router;
