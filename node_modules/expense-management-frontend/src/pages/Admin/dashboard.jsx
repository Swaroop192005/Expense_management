import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Employee',
    manager: 'Jane Smith'
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      user: 'John Doe',
      role: 'Employee',
      manager: 'Jane Smith',
      email: 'john@company.com'
    },
    {
      id: 2,
      user: 'Jane Smith',
      role: 'Manager',
      manager: 'Admin',
      email: 'jane@company.com'
    },
    {
      id: 3,
      user: 'Bob Wilson',
      role: 'Employee',
      manager: 'Jane Smith',
      email: 'bob@company.com'
    }
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateUser = () => {
    if (formData.name && formData.email) {
      const newUser = {
        id: users.length + 1,
        user: formData.name,
        role: formData.role,
        manager: formData.manager,
        email: formData.email
      };
      setUsers([...users, newUser]);
      setFormData({
        name: '',
        email: '',
        role: 'Employee',
        manager: 'Jane Smith'
      });
    }
  };

  const handleResetPassword = (userId) => {
    console.log('Send password for user:', userId);
    alert('Password sent to user email!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto bg-gray-700 rounded-lg shadow-2xl overflow-hidden border border-gray-600">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-center text-xl font-bold tracking-wide text-white">
            Admin View - User Management
          </h1>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Create New Employee Form */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-5 text-gray-200">Create New Employee</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* Role */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Role:</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>Employee</option>
                    <option>Manager</option>
                    <option>Admin</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Assign Manager */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Assign Manager:</label>
                <div className="relative">
                  <select
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>Jane Smith</option>
                    <option>John Doe</option>
                    <option>Admin</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Create User Button */}
            <button
              onClick={handleCreateUser}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              CREATE USER
            </button>
          </div>

          {/* Users Table */}
          <div>
            <h2 className="text-lg font-semibold mb-5 text-gray-200">Users Table</h2>
            
            <div className="border border-gray-600 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-blue-500">User</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-blue-500">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-blue-500">Manager</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-blue-500">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900">
                  {users.map((user, index) => (
                    <tr key={user.id} className={`${index !== users.length - 1 ? 'border-b border-gray-700' : ''} hover:bg-gray-800 transition-colors`}>
                      <td className="px-4 py-3 text-sm text-gray-300 border-r border-gray-700">{user.user}</td>
                      <td className="px-4 py-3 text-sm text-gray-300 border-r border-gray-700">{user.role}</td>
                      <td className="px-4 py-3 text-sm text-gray-300 border-r border-gray-700">{user.manager}</td>
                      <td className="px-4 py-3 text-sm text-gray-300 border-r border-gray-700">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleResetPassword(user.id)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors bg-blue"
                        >
                          Send Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}