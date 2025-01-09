import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { pantryprotectRoute } from "../middlewares/pantry.middleware.js";

const router = express.Router();

// Conditional middleware to allow either protection method
const combinedProtectRoute = async (req, res, next) => {
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


// Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", combinedProtectRoute, checkAuth);

export default router;
