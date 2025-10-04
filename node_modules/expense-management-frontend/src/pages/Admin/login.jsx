import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('Login successful!');
        // Navigation will be handled by ProtectedRoute
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg p-6">
          <h1 className="text-white text-2xl font-semibold">Login</h1>
          <p className="text-blue-100 text-sm mt-1">Access Your Account</p>
        </div>

        <div className="bg-gray-800 rounded-b-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>


            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-md transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <button
              type="button"
              className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 font-medium py-3 rounded-md transition duration-200"
            >
              Forgot Password?
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-400 text-sm">Don't have an account? </span>
            <a href="/signup" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Create Account
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}