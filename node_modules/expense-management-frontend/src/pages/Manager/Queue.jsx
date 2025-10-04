import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';

export default function ManagerQueue() {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      subject: 'Business Lunch with Client',
      owner: 'John Doe',
      category: 'Meals',
      status: 'Pending',
      originalAmount: '$120.50',
      convertedAmount: '$120.50',
      date: '2024-01-15',
      description: 'Lunch meeting with potential client to discuss project requirements'
    },
    {
      id: 2,
      subject: 'Taxi to Airport',
      owner: 'Jane Smith',
      category: 'Transport',
      status: 'Pending',
      originalAmount: '$45.00',
      convertedAmount: '$45.00',
      date: '2024-01-14',
      description: 'Taxi ride to airport for business trip'
    },
    {
      id: 3,
      subject: 'Office Supplies',
      owner: 'Bob Wilson',
      category: 'Office',
      status: 'Pending',
      originalAmount: '$89.99',
      convertedAmount: '$89.99',
      date: '2024-01-13',
      description: 'Purchase of office supplies for project'
    }
  ]);

  const handleApprove = (expenseId) => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId 
        ? { ...expense, status: 'Approved' }
        : expense
    ));
    setSelectedExpense(null);
  };

  const handleReject = (expenseId) => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId 
        ? { ...expense, status: 'Rejected' }
        : expense
    ));
    setSelectedExpense(null);
  };

  const handleViewDetails = (expense) => {
    setSelectedExpense(expense);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-white">Manager Approval Queue</h1>
          <p className="text-blue-100 mt-2">Review and approve pending expense requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expenses List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Pending Approvals</h2>
                <p className="text-gray-400 text-sm mt-1">{expenses.filter(e => e.status === 'Pending').length} items pending</p>
              </div>
              
              <div className="divide-y divide-gray-700">
                {expenses.filter(expense => expense.status === 'Pending').map((expense) => (
                  <div key={expense.id} className="p-6 hover:bg-gray-750 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{expense.subject}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                          <span>Owner: {expense.owner}</span>
                          <span>Category: {expense.category}</span>
                          <span>Date: {expense.date}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-green-400 font-semibold">{expense.originalAmount}</span>
                          <span className="text-blue-400 font-semibold">{expense.convertedAmount}</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                            <Clock className="w-3 h-3 mr-1" />
                            {expense.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(expense)}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleApprove(expense.id)}
                          className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(expense.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Receipt Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedExpense ? (
              <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Receipt Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">Subject</label>
                    <p className="text-white">{selectedExpense.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Description</label>
                    <p className="text-white">{selectedExpense.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Amount</label>
                    <p className="text-white">{selectedExpense.originalAmount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Category</label>
                    <p className="text-white">{selectedExpense.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Date</label>
                    <p className="text-white">{selectedExpense.date}</p>
                  </div>
                  
                  {/* Receipt Image Placeholder */}
                  <div className="mt-6">
                    <label className="text-sm font-medium text-gray-400">Receipt Image</label>
                    <div className="mt-2 bg-gray-700 rounded-lg p-8 text-center">
                      <div className="text-gray-400 text-sm">Receipt image would appear here</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => handleApprove(selectedExpense.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedExpense.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="text-gray-400">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select an expense to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
