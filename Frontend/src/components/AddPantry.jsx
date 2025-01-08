import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPantry() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staffName: '',
    contactInfo: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/admin');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">Add New Pantry Staff</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Staff Name</label>
              <input
                type="text"
                name="staffName"
                value={formData.staffName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Info</label>
              <input
                type="tel"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 shadow-md"
              >
                Add Pantry Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddPantry;