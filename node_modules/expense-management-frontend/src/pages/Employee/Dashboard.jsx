import { useState } from 'react';
import { User, Plus, Upload, ChevronDown, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function EmployeeExpenseView() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const expenses = [
    {
      id: 1,
      employee: 'John Doe',
      description: 'Client Dinner',
      date: '2024-01-15',
      category: 'Meals',
      paidBy: 'Personal',
      remarks: 'Meeting with ABC Corp',
      amount: 120.00,
      status: 'Approved'
    },
    {
      id: 2,
      employee: 'John Doe',
      description: 'Flight to NYC',
      date: '2024-01-10',
      category: 'Travel',
      paidBy: 'Company Card',
      remarks: 'Business trip',
      amount: 450.00,
      status: 'Pending'
    },
    {
      id: 3,
      employee: 'John Doe',
      description: 'Office Supplies',
      date: '2024-01-08',
      category: 'Supplies',
      paidBy: 'Personal',
      remarks: 'Notebooks, pens',
      amount: 25.50,
      status: 'Rejected'
    },
    {
      id: 4,
      employee: 'John Doe',
      description: 'Hotel Stay',
      date: '2024-01-12',
      category: 'Travel',
      paidBy: 'Company Card',
      remarks: 'Conference accommodation',
      amount: 320.00,
      status: 'Approved'
    },
    {
      id: 5,
      employee: 'John Doe',
      description: 'Taxi Fare',
      date: '2024-01-09',
      category: 'Travel',
      paidBy: 'Personal',
      remarks: 'Airport transfer',
      amount: 45.00,
      status: 'Pending'
    }
  ];

  // Calculate statistics
  const stats = {
    pending: {
      count: expenses.filter(e => e.status === 'Pending').length,
      amount: expenses.filter(e => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0)
    },
    approved: {
      count: expenses.filter(e => e.status === 'Approved').length,
      amount: expenses.filter(e => e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0)
    },
    rejected: {
      count: expenses.filter(e => e.status === 'Rejected').length,
      amount: expenses.filter(e => e.status === 'Rejected').reduce((sum, e) => sum + e.amount, 0)
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-500 bg-opacity-20 text-green-400 border-green-500';
      case 'Pending': return 'bg-yellow-500 bg-opacity-20 text-white-400 border-yellow-500';
      case 'Rejected': return 'bg-red-500 bg-opacity-20 text-red-400 border-red-500';
      default: return 'bg-gray-500 bg-opacity-20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl font-bold text-white">Expense Management</h1>
            
            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 rounded-lg px-5 py-3 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-200 font-semibold hidden sm:block text-base">John Doe</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl py-2 z-10">
                  <a href="#" className="block px-5 py-3 text-gray-300 hover:bg-gray-700 transition text-base">My Profile</a>
                  <a href="#" className="block px-5 py-3 text-gray-300 hover:bg-gray-700 transition text-base">Settings</a>
                  <hr className="border-gray-700 my-2" />
                  <a href="#" className="block px-5 py-3 text-red-400 hover:bg-gray-700 transition text-base">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {/* Pending Card */}
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg shadow-lg px-18 py-3 flex items-center space-x-4">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-yellow-100 text-xs font-medium">Pending</p>
              <p className="text-white text-lg font-bold">{stats.pending.count} Requests</p>
            </div>
            <div className="border-l border-yellow-400 border-opacity-30 pl-4 ml-4">
              <p className="text-yellow-100 text-xs">Amount</p>
              <p className="text-white text-lg font-bold">${stats.pending.amount.toFixed(2)}</p>
            </div>
          </div>

          {/* Approved Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg px-18 py-3 flex items-center space-x-4">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-green-100 text-xs font-medium">Approved</p>
              <p className="text-white text-lg font-bold">{stats.approved.count} Requests</p>
            </div>
            <div className="border-l border-green-400 border-opacity-30 pl-4 ml-4">
              <p className="text-green-100 text-xs">Amount</p>
              <p className="text-white text-lg font-bold">${stats.approved.amount.toFixed(2)}</p>
            </div>
          </div>

          {/* Rejected Card */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg px-18 py-3 flex items-center space-x-4">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-red-100 text-xs font-medium">Rejected</p>
              <p className="text-white text-lg font-bold">{stats.rejected.count} Requests</p>
            </div>
            <div className="border-l border-red-400 border-opacity-30 pl-4 ml-4">
              <p className="text-red-100 text-xs">Amount</p>
              <p className="text-white text-lg font-bold">${stats.rejected.amount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Expense Table */}
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {/* Title Section */}
          

          {/* Action Buttons */}
          <div className="p-7 border-b border-gray-700">
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 bg-black hover:bg-gray-900 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 shadow-md text-base">
                <Plus className="w-5 h-5" />
                <span>NEW EXPENSE</span>
              </button>
              <button className="flex items-center space-x-2 bg-transparent border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-700 text-gray-300 font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 text-base">
                <Upload className="w-5 h-5" />
                <span>UPLOAD RECEIPT (OCR)</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Paid By</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Remarks</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-750 transition-colors duration-150">
                    <td className="px-6 py-5 text-base text-gray-300 font-medium">{expense.employee}</td>
                    <td className="px-6 py-5 text-base text-gray-300">{expense.description}</td>
                    <td className="px-6 py-5 text-base text-gray-300">{expense.date}</td>
                    <td className="px-6 py-5 text-base text-gray-300">{expense.category}</td>
                    <td className="px-6 py-5 text-base text-gray-300">{expense.paidBy}</td>
                    <td className="px-6 py-5 text-base text-gray-300">{expense.remarks}</td>
                    <td className="px-6 py-5 text-base font-semibold text-gray-200">${expense.amount.toFixed(2)}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full border text-white ${getStatusColor(expense.status)}`}>
                        {expense.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Info Footer */}
          <div className="p-7 bg-red-900 bg-opacity-20 border-t border-gray-700">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-1 bg-red-500 h-full mr-5 rounded"></div>
              <p className="text-base text-red-300 italic leading-relaxed">
                Employees can view all their expense requests and their approval status
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
