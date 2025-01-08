import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PatientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const patient = {
    id,
    name: 'John Doe',
    roomNumber: '101',
    disease: 'Diabetes',
    allergies: 'Nuts'
  };

  const [mealPlan, setMealPlan] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Meal plan submitted:', mealPlan);
    alert('Meal plan saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg')`
        }}
      />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow rounded-lg p-6">
          {/* Patient Info Header */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-indigo-900">{patient.name}</h2>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>Room: {patient.roomNumber}</p>
              <p>Condition: {patient.disease}</p>
              <p>Allergies: {patient.allergies}</p>
            </div>
          </div>

          {/* Meal Planning Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Breakfast
              </label>
              <textarea
                value={mealPlan.breakfast}
                onChange={(e) => setMealPlan(prev => ({ ...prev, breakfast: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter breakfast menu..."
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Lunch
              </label>
              <textarea
                value={mealPlan.lunch}
                onChange={(e) => setMealPlan(prev => ({ ...prev, lunch: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter lunch menu..."
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Dinner
              </label>
              <textarea
                value={mealPlan.dinner}
                onChange={(e) => setMealPlan(prev => ({ ...prev, dinner: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter dinner menu..."
                required
              />
            </div>

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
                Save Meal Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PatientDetails;