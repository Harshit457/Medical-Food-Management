import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Import the authStore

function PantryNav({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore(); // Extract the logout function and authUser from authStore
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu

  const handleLogout = () => {
    logout(); // Call the logout function from authStore
    navigate("/"); // Redirect to the login page
  };

  const handleDashboard = () => {
    if (authUser && authUser.staffName) {
      navigate(`/pantry/${authUser.staffName}`); // Navigate to /pantry/:staffName using staffName from authUser
    } else {
      toast.error("Staff name not found.");
    }
  };

  return (
    <nav className="relative z-10 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-indigo-800">
            Pantry DashBoard
          </h1>

          {/* Hamburger Menu for Small Screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
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

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleDashboard}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md"
            >
              Dashboard
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
          <div className="md:hidden mt-2 space-y-4">
            {/* Search Bar */}
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

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleDashboard}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors shadow-md"
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

export default PantryNav;
