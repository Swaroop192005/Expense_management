import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    adminName: '',
    adminEmail: '',
    password: '',
    confirmPassword: '',
    country: 'United States',
    companyName: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!formData.companyName) {
      toast.error('Company name is required');
      return;
    }

    setLoading(true);
    
    try {
      const result = await register({
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        password: formData.password,
        country: formData.country,
        companyName: formData.companyName
      });
      
      if (result.success) {
        toast.success('Account created successfully!');
        // Navigation will be handled by ProtectedRoute
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-xl font-bold text-white tracking-wide">
            Company Registration
          </h1>
          <p className="text-blue-100 text-sm mt-1">Admin Account Setup</p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-5">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Admin Name
            </label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Admin Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              placeholder="admin@company.com"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a secure password"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Country
            </label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Germany</option>
                <option>France</option>
                <option>India</option>
                <option>Japan</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm pt-2">
            <span className="text-gray-400">Already have an account? </span>
            <a href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}