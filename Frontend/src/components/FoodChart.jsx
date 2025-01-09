import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importing necessary hooks for navigation
import { axiosInstance } from '../lib/axios'; // Import your configured axios instance
import Navbar from './Navbar';

const FoodChart = () => {
  const [foodCharts, setFoodCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: patientId } = useParams(); // Getting patientId from URL parameters
  const navigate = useNavigate(); // Hook for navigation

  // Fetch the food chart data from the backend using axios
  useEffect(() => {
    const fetchFoodCharts = async () => {
      try {
        const response = await axiosInstance.get(`/auth/${patientId}`); // Fetch data based on patientId
        setFoodCharts(response.data);
      } catch (err) {
        setError('Failed to fetch food charts');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodCharts();
  }, [patientId]);

  // Rendering based on state
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <h2 className="text-3xl font-bold text-center mb-6 mt-6">Patient Food Charts</h2>

      {/* Button to navigate to Create New Food Chart page */}
      <div className="mb-4 text-center">
        <button
          onClick={() => navigate(`/patient/foodchart/${patientId}`)} // Navigate to the create food chart page
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Create New Food Chart
        </button>
      </div>

      {/* Display food charts or show a message if no charts exist */}
      {foodCharts.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No food chart for this user.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodCharts
            .slice() // Create a copy to avoid mutating the original array
            .reverse() // Reverse the order of the food charts
            .map((foodChart) => {
              // Check if all meals have "Completed" status
              const allMealsCompleted =
                foodChart.morningMeal.status === 'Completed' &&
                foodChart.eveningMeal.status === 'Completed' &&
                foodChart.nightMeal.status === 'Completed';

              return (
                <div
                  key={foodChart._id}
                  className={`max-w-sm w-full rounded-lg border border-gray-200 shadow-lg p-4 mb-4 ${
                    allMealsCompleted ? 'bg-green-300' : 'bg-white'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Food Chart for Patient: {foodChart.patientId}
                  </h3>

                  <div className="space-y-3">
                    {/* Morning Meal */}
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-lg">Morning Meal</h4>
                      <div className="text-sm">
                        <p>
                          <strong>Ingredients:</strong>{' '}
                          {foodChart.morningMeal.ingredients.join(', ')}
                        </p>
                        <p>
                          <strong>Instructions:</strong>{' '}
                          {foodChart.morningMeal.instructions}
                        </p>
                        <p className="mt-2 p-2 rounded-md">
                          {foodChart.morningMeal.status}
                        </p>
                      </div>
                    </div>

                    {/* Evening Meal */}
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-lg">Evening Meal</h4>
                      <div className="text-sm">
                        <p>
                          <strong>Ingredients:</strong>{' '}
                          {foodChart.eveningMeal.ingredients.join(', ')}
                        </p>
                        <p>
                          <strong>Instructions:</strong>{' '}
                          {foodChart.eveningMeal.instructions}
                        </p>
                        <p className="mt-2 p-2 rounded-md">
                          {foodChart.eveningMeal.status}
                        </p>
                      </div>
                    </div>

                    {/* Night Meal */}
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-lg">Night Meal</h4>
                      <div className="text-sm">
                        <p>
                          <strong>Ingredients:</strong>{' '}
                          {foodChart.nightMeal.ingredients.join(', ')}
                        </p>
                        <p>
                          <strong>Instructions:</strong>{' '}
                          {foodChart.nightMeal.instructions}
                        </p>
                        <p className="mt-2 p-2 rounded-md">
                          {foodChart.nightMeal.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      <strong>Assigned by:</strong> {foodChart.staffName}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default FoodChart;
