import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios'; // Adjust the import path as needed
import Navbar from './Navbar';

function PatientDetails() {
  const navigate = useNavigate();
  const { patientId } = useParams(); // Get patientId from params
  console.log(patientId);

  const [patient, setPatient] = useState(null); // To hold patient details
  const [mealPlan, setMealPlan] = useState({
    morningMeal: {
      ingredients: '',
      instructions: '',
    },
    eveningMeal: {
      ingredients: '',
      instructions: '',
    },
    nightMeal: {
      ingredients: '',
      instructions: '',
    },
    staffName: '', // For the dropdown
  });

  const [pantryStaffNames, setPantryStaffNames] = useState([]); // Renamed state variable

  // Fetch patient details
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axiosInstance.get(`/auth/patient/${patientId}`);
        setPatient(response.data); // Set the patient data from the response
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  // Fetch distinct pantry staff names
  useEffect(() => {
    const fetchStaffNames = async () => {
      try {
        const response = await axiosInstance.get('/auth/pantry/getstaffname'); // Correct API to fetch staff names
        setPantryStaffNames(response.data); // Assuming the response is an array of staff names
      } catch (error) {
        console.error("Error fetching staff names:", error);
      }
    };

    fetchStaffNames();
  }, []); // This will run once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/auth/createFoodChart/${patientId}`, mealPlan);
      console.log('Food chart created:', response.data);
      alert('Food chart saved successfully!');
      navigate(`/patient/${patientId}`); // Navigate to the patient's page or any other relevant page
    } catch (error) {
      console.error("Error saving food chart:", error);
      alert('Failed to save food chart.');
    }
  };

  if (!patient) {
    return <div>Loading patient details...</div>; // Display a loading message until the data is fetched
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div
        className="absolute inset-0 z-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg')`
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto mt-10">
        <div className="bg-white/80 backdrop-blur-sm shadow rounded-lg p-6">
          {/* Patient Info Header */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-indigo-900">{patient.PatientName}</h2>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>Room: {patient.RoomNumber}</p>
              <p>Condition: {patient.Diseases}</p>
              <p>Allergies: {patient.Allergies}</p>
            </div>
          </div>

          {/* Food Chart Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Morning Meal */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Morning Meal Ingredients
              </label>
              <textarea
                value={mealPlan.morningMeal.ingredients}
                onChange={(e) => setMealPlan(prev => ({
                  ...prev,
                  morningMeal: { ...prev.morningMeal, ingredients: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter ingredients..."
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Morning Meal Instructions
              </label>
              <textarea
                value={mealPlan.morningMeal.instructions}
                onChange={(e) => setMealPlan(prev => ({
                  ...prev,
                  morningMeal: { ...prev.morningMeal, instructions: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter instructions..."
                required
              />
            </div>

            {/* Evening Meal */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Evening Meal Ingredients
              </label>
              <textarea
                value={mealPlan.eveningMeal.ingredients}
                onChange={(e) => setMealPlan(prev => ({
                  ...prev,
                  eveningMeal: { ...prev.eveningMeal, ingredients: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter ingredients..."
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Evening Meal Instructions
              </label>
              <textarea
                value={mealPlan.eveningMeal.instructions}
                onChange={(e) => setMealPlan(prev => ({
                  ...prev,
                  eveningMeal: { ...prev.eveningMeal, instructions: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter instructions..."
                required
              />
            </div>

            {/* Night Meal */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Night Meal Ingredients
              </label>
              <textarea
                value={mealPlan.nightMeal.ingredients}
                onChange={(e) => setMealPlan(prev => ({
                  ...prev,
                  nightMeal: { ...prev.nightMeal, ingredients: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter ingredients..."
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Night Meal Instructions
              </label>
              <textarea
                value={mealPlan.nightMeal.instructions}
                onChange={(e) => setMealPlan(prev => ({
                  ...prev,
                  nightMeal: { ...prev.nightMeal, instructions: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter instructions..."
                required
              />
            </div>

            {/* Staff Name Dropdown */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Staff Name
              </label>
              <select
                value={mealPlan.staffName}
                onChange={(e) => setMealPlan(prev => ({
                  ...prev,
                  staffName: e.target.value
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Staff</option>
                {pantryStaffNames.map((staff, index) => (
                  <option key={index} value={staff}>{staff}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-md"
              >
                Back to Dashboard
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md"
              >
                Save Food Chart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
