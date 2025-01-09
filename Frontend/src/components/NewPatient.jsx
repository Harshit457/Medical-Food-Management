import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

function NewPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    PatientName: '',
    Diseases: '',
    Allergies: '',
    RoomNumber: '',
    BedNumber: '',
    FloorNumber: '',
    Age: '',
    Gender: '',
    ContactInformation: '',
    EmergencyContact: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post('/auth/patient', formData);
      navigate('/admin');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Patient</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <input
                  type="text"
                  name="PatientName"
                  value={formData.PatientName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Disease</label>
                <input
                  type="text"
                  name="Diseases"
                  value={formData.Diseases}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Allergies</label>
                <input
                  type="text"
                  name="Allergies"
                  value={formData.Allergies}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Number</label>
                <input
                  type="number"
                  name="RoomNumber"
                  value={formData.RoomNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bed Number</label>
                <input
                  type="number"
                  name="BedNumber"
                  value={formData.BedNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Floor Number</label>
                <input
                  type="number"
                  name="FloorNumber"
                  value={formData.FloorNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  name="ContactInformation"
                  value={formData.ContactInformation}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <input
                  type="tel"
                  name="EmergencyContact"
                  value={formData.EmergencyContact}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 shadow-md"
              >
                Add Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPatient;
