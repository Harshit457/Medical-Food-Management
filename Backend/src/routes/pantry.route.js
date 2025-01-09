import express from "express";
import { createPantry, loginPantry  ,getDistinctStaffNames  } from "../controllers/pantry.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/createPantry", protectRoute, createPantry);
router.post("/pantry/login",loginPantry);
router.get("/pantry/getstaffname",protectRoute,getDistinctStaffNames)
export default router;
