import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import AdminDashboard from "./components/AdminDashboard";
import NewPatient from "./components/NewPatient";
import AddPantry from "./components/AddPantry";
import PatientDetails from "./components/PatientDetails";
import FoodChart from "./components/FoodChart";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate } from "react-router-dom";
import PantryDashboard from "./components/PantryDashboard";
import PatientMealPlan from "./components/PatientMeal";
import PantryNav from "./components/PantryNav";
function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  console.log({ onlineUsers });
  console.log({ authUser });

  useEffect(() => {
    // Call checkAuth asynchronously
    const authenticate = async () => {
      await checkAuth();  // Assuming checkAuth is an async function
      setIsLoading(false); // Set loading state to false after authentication check
    };

    authenticate();
  }, [checkAuth]);

  if (isLoading || isCheckingAuth) {
    // Show loading state until checkAuth finishes
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!authUser ? <SignIn /> : <Navigate to="/admin" />}
        />
        <Route
          path="/admin"
          element={authUser ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/new-patient"
          element={authUser ? <NewPatient /> : <Navigate to="/" />}
        />
        <Route
          path="/add-pantry"
          element={authUser ? <AddPantry /> : <Navigate to="/" />}
        />
        <Route
          path="/patient/:id"
          element={authUser ? <FoodChart /> : <Navigate to="/" />}
        />
        <Route
          path="/patient/foodchart/:patientId"
          element={authUser ? <PatientDetails /> : <Navigate to="/" />}
        />
        <Route
          path="/pantry/:id"
          element={authUser ?<div> <PantryNav></PantryNav><PantryDashboard /></div> : <Navigate to="/" />}
        />
        <Route
          path="/update/:patientId"
          element={authUser ? <PatientMealPlan /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
