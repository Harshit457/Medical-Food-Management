import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming React Router is being used
import { axiosInstance } from '../lib/axios'; // Adjust the path as needed
import PantryNav from './PantryNav';

function PantryDashboard() {
  const [foodCharts, setFoodCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const fetchFoodCharts = async () => {
      try {
        const response = await axiosInstance("/auth/Staff/Green_Chilli"); // Adjust staffName dynamically if needed
        setFoodCharts(response.data); // Assuming the response contains an array of food chart objects
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };
    fetchFoodCharts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Reverse the foodCharts array */}
          {foodCharts.slice().reverse().map((foodChart, index) => {
            // Check if all meals are completed
            const allMealsCompleted = 
              foodChart.morningMeal.status === "Completed" &&
              foodChart.eveningMeal.status === "Completed" &&
              foodChart.nightMeal.status === "Completed";

            return (
              <div
                key={index}
                className={`card p-4 rounded-lg shadow-lg ${allMealsCompleted ? 'bg-green-300' : 'bg-white'}`}
              >
                {/* Patient Information */}
                <div className="border-b pb-4 mb-4">
                  <h4 className="font-bold text-lg">Patient Details</h4>
                  <p><strong>Name:</strong> {foodChart.patientId.PatientName}</p>
                  <p><strong>Age:</strong> {foodChart.patientId.Age}</p>
                  <p><strong>Gender:</strong> {foodChart.patientId.Gender}</p>
                  <p><strong>Room Number:</strong> {foodChart.patientId.RoomNumber}</p>
                  <p><strong>Contact:</strong> {foodChart.patientId.ContactInformation}</p>
                  <p><strong>Allergies:</strong> {foodChart.patientId.Allergies}</p>
                  <p><strong>Diseases:</strong> {foodChart.patientId.Diseases}</p>
                </div>

                {/* Check Meal Plan Button */}
                <button
                  onClick={() => navigate(`/update/${foodChart.patientId._id}`)} // Navigates to the meal plan route
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                  Check Meal Plan
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default PantryDashboard;
