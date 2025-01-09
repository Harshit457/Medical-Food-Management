import jwt from "jsonwebtoken";
import Pantry from "../models/Pantry.model.js";

export const pantryprotectRoute = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwtd;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRETD);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await Pantry.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
