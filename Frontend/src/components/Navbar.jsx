import { useState } from 'react';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; // Import the authStore

function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore(); // Extract the logout function from authStore
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    logout(); // Call the logout function from authStore
    navigate('/'); // Redirect to the login page
  };

  return (
    <nav className="relative z-10 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-indigo-800">Hospital Dashboard</h1>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
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

          {/* Action Buttons (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md"
            >
              Dashboard
            </button>
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
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2">
            <div className="flex flex-col space-y-2">
              <div className="relative w-full px-4">
                <MagnifyingGlassIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md mx-4"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/new-patient')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md mx-4"
              >
                New Patient
              </button>
              <button
                onClick={() => navigate('/add-pantry')}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors shadow-md mx-4"
              >
                Add Pantry
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors shadow-md mx-4"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
