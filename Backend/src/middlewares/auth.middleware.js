import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("Unauthorized - No Token Provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Unauthorized - Invalid Token");
    }

    const user = await Admin.findById(decoded.userId).select("-password");

    if (!user) {
      throw new Error("Unauthorized - User Not Found");
    }

    req.user = user;
    next(); // Proceed if everything is fine
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

