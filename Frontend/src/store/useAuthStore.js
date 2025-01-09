import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  
  // In your store or wherever the login function is defined
login: async (data, userType) => {
  set({ isLoggingIn: true });
  try {
    const endpoint = userType === "admin" ? "/auth/login" : "/auth/pantry/login";
    const res = await axiosInstance.post(endpoint, data);
    console.log("Login Response:", res.data); // Log the response to check the data

    // Assuming the backend response includes staffName for pantry users
    set({ authUser: res.data });
    toast.success("Logged in successfully");

    // Return the response so we can use it in handleSignIn
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    throw error; // Re-throw error to be caught in handleSignIn
  } finally {
    set({ isLoggingIn: false });
  }
},

  

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
