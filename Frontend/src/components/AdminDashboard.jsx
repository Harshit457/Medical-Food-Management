import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios'; // Import axios instance
import Navbar from './Navbar';
import { useAuthStore } from '../store/useAuthStore'; // Import auth store

function AdminDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // Check if the user is authenticated
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading....
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-fadeIn">
        <p className="text-red-500 dark:text-red-300">
          You are not logged in. Please log in to view patients.
        </p>
      </div>
    );
  }

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get('/auth/patient');
        setPatients(response.data);
        setLastUpdated(Date.now()); // Track last update time
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch patients');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();

    // Polling: Re-fetch patients every 10 seconds
    const interval = setInterval(fetchPatients, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [authUser]);

  // Filtered patients based on the search term
  const filteredPatients = patients.filter((patient) =>
    patient.PatientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.Diseases.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.RoomNumber.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg')`
        }}
      />

      {/* Navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient List</h2>

          {/* Loading State */}
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Loading patients...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-8">{error}</p>
          ) : filteredPatients.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No patients found matching your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...filteredPatients].reverse().map((patient) => (
                <div
                  key={patient._id} // Use _id as key
                  onClick={() => navigate(`/patient/${patient._id}`)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                >
                  <h3 className="font-semibold text-lg text-indigo-600">{patient.PatientName}</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Room:</span>
                      <span className="ml-2">{patient.RoomNumber}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Condition:</span>
                      <span className="ml-2">{patient.Diseases}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Age:</span>
                      <span className="ml-2">{patient.Age}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Gender:</span>
                      <span className="ml-2">{patient.Gender}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="text-sm text-indigo-500 hover:text-indigo-600 flex items-center">
                      Manage meals →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
