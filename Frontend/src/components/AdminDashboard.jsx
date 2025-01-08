import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function AdminDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients] = useState([
    { id: 1, name: 'John Doe', roomNumber: '101', disease: 'Diabetes' },
    { id: 2, name: 'Jane Smith', roomNumber: '102', disease: 'Hypertension' },
    { id: 3, name: 'Mike Johnson', roomNumber: '103', disease: 'Cardiac' }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.roomNumber.includes(searchTerm)
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
      <nav className="relative z-10 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-indigo-800">
              Hospital Dashboard
            </h1>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/new-patient')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md"
              >
                New Patient
              </button>
              <button
                onClick={() => navigate('/add-pantry')}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors shadow-md"
              >
                Add Pantry
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient List</h2>
          
          {filteredPatients.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No patients found matching your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => navigate(`/patient/${patient.id}`)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                >
                  <h3 className="font-semibold text-lg text-indigo-600">{patient.name}</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Room:</span>
                      <span className="ml-2">{patient.roomNumber}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Condition:</span>
                      <span className="ml-2">{patient.disease}</span>
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