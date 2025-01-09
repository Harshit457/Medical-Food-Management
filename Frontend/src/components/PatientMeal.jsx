import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import PantryNav from './PantryNav';

function PatientMealPlan() {
  const { patientId } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patientResponse = await axiosInstance(`/auth/patient/${patientId}`);
        setPatientDetails(patientResponse.data);

        const mealPlanResponse = await axiosInstance(`/auth/${patientId}`);
        setMealPlans(Array.isArray(mealPlanResponse.data) ? mealPlanResponse.data : [mealPlanResponse.data]);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleStatusChange = (mealIndex, timeOfMeal, newStatus) => {
    setMealPlans((prevPlans) =>
      prevPlans.map((mealPlan, index) =>
        index === mealIndex
          ? {
              ...mealPlan,
              [timeOfMeal]: {
                ...mealPlan[timeOfMeal],
                status: newStatus,
              },
            }
          : mealPlan
      )
    );
  };

  const handleUpdate = async (id, mealPlan) => {
    const updatePayload = { id };
    ['morningMeal', 'eveningMeal', 'nightMeal'].forEach((meal) => {
      if (mealPlan[meal] && mealPlan[meal].status) {
        updatePayload[`${meal}Status`] = mealPlan[meal].status;
      }
    });

    try {
      await axiosInstance.post('/auth/update', updatePayload);
      alert('Meal plan updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update meal plan. Please try again.');
    }
  };

  // Function to check if all meals have been completed
  const isMealPlanCompleted = (mealPlan) => {
    return ['morningMeal', 'eveningMeal', 'nightMeal'].every((meal) => mealPlan[meal]?.status === 'Completed');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <PantryNav />

      {/* Patient Details Section */}
      <div className="flex flex-wrap gap-6 justify-center bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <p><strong>Name:</strong> {patientDetails.PatientName}</p>
          <p><strong>Age:</strong> {patientDetails.Age}</p>
          <p><strong>Gender:</strong> {patientDetails.Gender}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <p><strong>Room Number:</strong> {patientDetails.RoomNumber}</p>
          <p><strong>Bed Number:</strong> {patientDetails.BedNumber}</p>
          <p><strong>Floor Number:</strong> {patientDetails.FloorNumber}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <p><strong>Contact:</strong> {patientDetails.ContactInformation}</p>
          <p><strong>Emergency Contact:</strong> {patientDetails.EmergencyContact}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <p><strong>Diseases:</strong> {patientDetails.Diseases}</p>
          <p><strong>Allergies:</strong> {patientDetails.Allergies}</p>
        </div>
      </div>

      {/* Meal Plan Section */}
      <h2 className="text-2xl font-semibold text-center my-6">Meal Plans</h2>

      {/* Grid layout for meal plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
        {mealPlans.map((mealPlan, index) => {
          // Check if all meals are completed and set the class accordingly
          const cardClass = isMealPlanCompleted(mealPlan) ? 'bg-green-300' : 'bg-white';
          
          return (
            <div key={mealPlan._id || index} className={`card shadow-lg rounded-lg p-6 ${cardClass}`}>
              <h3 className="text-xl font-bold mb-4">Meal Plan {index + 1}</h3>
              {['morningMeal', 'eveningMeal', 'nightMeal'].map((timeOfMeal) => (
                <div key={`${mealPlan._id || index}-${timeOfMeal}`} className="mb-4">
                  <h4 className="font-bold text-lg capitalize">{timeOfMeal.replace('Meal', ' Meal')}</h4>
                  <p><strong>Status:</strong></p>
                  <select
                    value={mealPlan[timeOfMeal].status}
                    onChange={(e) => handleStatusChange(index, timeOfMeal, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <p><strong>Ingredients:</strong> {mealPlan[timeOfMeal].ingredients.join(', ')}</p>
                  <p><strong>Instructions:</strong> {mealPlan[timeOfMeal].instructions}</p>
                </div>
              ))}

              <div className="mt-4">
                <h4 className="font-bold text-lg">Staff Responsible</h4>
                <p>{mealPlan.staffName}</p>
              </div>

              <button
                onClick={() => handleUpdate(mealPlan._id, mealPlan)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PatientMealPlan;
