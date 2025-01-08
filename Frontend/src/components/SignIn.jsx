import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (userType === 'admin') {
      navigate('/admin');
    } else if (userType === 'pantry') {
      alert('Pantry signin functionality coming soon!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg')`
        }}
      />
      
      <div className="relative z-10 max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-indigo-900">
            Hospital Food Delivery Management
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sign in as
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select user type</option>
                <option value="admin">Admin</option>
                <option value="pantry">Hospital Pantry</option>
              </select>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignIn;