import { useState } from 'react';
import { Check, X, Info } from 'lucide-react';

export default function ManagerApprovalsView() {
  const [comments, setComments] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses] = useState([
    {
      id: 1,
      subject: 'Client Dinner - ABC Corp',
      owner: 'John Doe',
      category: 'Meals',
      status: 'Pending',
      statusType: 'pending',
      originalAmount: '120 $ (in INR)',
      convertedAmount: '₹10,080',
      receipt: {
        date: '2025-09-28',
        merchant: 'ABC Restaurant',
        description: 'Client dinner with ABC Corp executives to discuss Q4 strategy',
        items: [
          { name: 'Appetizers', amount: '₹2,000' },
          { name: 'Main Course (4 persons)', amount: '₹5,600' },
          { name: 'Beverages', amount: '₹1,480' },
          { name: 'Desserts', amount: '₹1,000' }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'
      }
    },
    {
      id: 2,
      subject: 'Flight to NYC',
      owner: 'John Doe',
      category: 'Travel',
      status: 'Pending',
      statusType: 'pending',
      originalAmount: '450 $ (in USD)',
      convertedAmount: '₹37,800',
      receipt: {
        date: '2025-09-25',
        merchant: 'Delta Airlines',
        description: 'Business trip to NYC for client meeting',
        items: [
          { name: 'Flight Ticket (Economy)', amount: '₹32,000' },
          { name: 'Baggage Fee', amount: '₹3,800' },
          { name: 'Seat Selection', amount: '₹2,000' }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400'
      }
    },
    {
      id: 3,
      subject: 'Team Building Event',
      owner: 'Sarah Lee',
      category: 'Entertainment',
      status: 'Approved',
      statusType: 'approved',
      originalAmount: '800 $ (in USD)',
      convertedAmount: '₹67,200',
      receipt: {
        date: '2025-09-20',
        merchant: 'Adventure Park & Resort',
        description: 'Team building activities for 20 employees',
        items: [
          { name: 'Activity Tickets (20 persons)', amount: '₹40,000' },
          { name: 'Lunch & Refreshments', amount: '₹18,000' },
          { name: 'Transportation', amount: '₹9,200' }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400'
      }
    },
    {
      id: 4,
      subject: 'Office Supplies Bulk Order',
      owner: 'Mike Chen',
      category: 'Supplies',
      status: 'Pending',
      statusType: 'pending',
      originalAmount: '1200 $ (in USD)',
      convertedAmount: '₹1,00,800',
      receipt: {
        date: '2025-09-22',
        merchant: 'Office Depot',
        description: 'Quarterly office supplies and stationery',
        items: [
          { name: 'Printer Papers (100 reams)', amount: '₹35,000' },
          { name: 'Ink Cartridges', amount: '₹28,000' },
          { name: 'Office Stationery', amount: '₹22,800' },
          { name: 'Whiteboard Markers', amount: '₹15,000' }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400'
      }
    },
    {
      id: 5,
      subject: 'none',
      owner: 'Sarah',
      category: 'Food',
      status: 'Approved',
      statusType: 'approved',
      originalAmount: '567 $ (in INR)',
      convertedAmount: '₹49,896',
      receipt: {
        date: '2025-09-18',
        merchant: 'Local Cafe',
        description: 'Team lunch meeting',
        items: [
          { name: 'Lunch for 8 persons', amount: '₹35,000' },
          { name: 'Beverages', amount: '₹8,896' },
          { name: 'Service Tax', amount: '₹6,000' }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'
      }
    }
  ]);

  const handleRowClick = (expense) => {
    setSelectedExpense(expense);
  };

  const handleApprove = (id) => {
    alert(`Approval submitted for request #${id}`);
  };

  const handleReject = (id) => {
    alert(`Rejection submitted for request #${id}`);
  };

  const handleBulkApprove = () => {
    alert('Bulk approve functionality');
  };

  const handleBulkReject = () => {
    alert('Bulk reject functionality');
  };

  const getStatusBadge = (statusType, status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      'needs-approval': 'bg-red-100 text-red-800'
    };
    return `${styles[statusType]} px-3 py-1 rounded-full text-xs font-semibold inline-block`;
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h1 className="text-center text-xl font-bold tracking-wider text-white">
                MANAGER'S VIEW - PENDING APPROVALS
              </h1>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6 pb-4 border-b-2 border-slate-700">
                Approvals to review
              </h2>

              <div className="mb-8 border-2 border-slate-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-700 to-slate-600">
                      <tr>
                        <th className="px-4 py-4 text-left text-white font-semibold text-xs border-r border-slate-500">Approval Subject</th>
                        <th className="px-4 py-4 text-left text-white font-semibold text-xs border-r border-slate-500">Request Owner</th>
                        <th className="px-4 py-4 text-left text-white font-semibold text-xs border-r border-slate-500">Category</th>
                        <th className="px-4 py-4 text-left text-white font-semibold text-xs border-r border-slate-500">Request Status</th>
                        <th className="px-4 py-4 text-left text-white font-semibold text-xs border-r border-slate-500">
                          Total Amount<br />(in company's currency)
                        </th>
                        <th className="px-4 py-4 text-center text-white font-semibold text-xs">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-900">
                      {expenses.map((expense, index) => (
                        <tr 
                          key={expense.id} 
                          onClick={() => handleRowClick(expense)}
                          className={`hover:bg-slate-800 transition-colors cursor-pointer ${
                            index !== expenses.length - 1 ? 'border-b border-slate-700' : ''
                          } ${selectedExpense?.id === expense.id ? 'bg-slate-800 border-l-4 border-blue-500' : ''}`}
                        >
                          <td className="px-4 py-4 text-sm text-slate-300 border-r border-slate-700">{expense.subject}</td>
                          <td className="px-4 py-4 text-sm text-slate-300 border-r border-slate-700">{expense.owner}</td>
                          <td className="px-4 py-4 text-sm text-slate-300 border-r border-slate-700">{expense.category}</td>
                          <td className="px-4 py-4 border-r border-slate-700">
                            <span className={getStatusBadge(expense.statusType, expense.status)}>
                              {expense.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 border-r border-slate-700">
                            <div className="flex flex-col gap-1">
                              <span className="text-red-400 text-xs font-semibold">{expense.originalAmount}</span>
                              <span className="text-slate-300 text-sm font-semibold">= {expense.convertedAmount}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleApprove(expense.id)}
                                className="px-5 py-2 border-2 border-green-500 text-green-400 rounded-lg text-sm font-semibold hover:bg-green-500 hover:text-white transition-all"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(expense.id)}
                                className="px-5 py-2 border-2 border-red-500 text-red-400 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-all"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              

            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h3 className="text-center font-bold text-white">Receipt Details</h3>
              </div>
              
              {selectedExpense ? (
                <div className="p-6">
                  <div className="mb-4 rounded-lg overflow-hidden border-2 border-slate-700">
                    <img 
                      src={selectedExpense.receipt.imageUrl} 
                      alt="Receipt" 
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{selectedExpense.subject}</h4>
                      <p className="text-sm text-slate-400">{selectedExpense.receipt.description}</p>
                    </div>

                    <div className="border-t border-slate-700 pt-4">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-slate-500">Date</p>
                          <p className="text-sm text-slate-300 font-semibold">{selectedExpense.receipt.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Category</p>
                          <p className="text-sm text-slate-300 font-semibold">{selectedExpense.category}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-slate-500">Merchant</p>
                        <p className="text-sm text-slate-300 font-semibold">{selectedExpense.receipt.merchant}</p>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-slate-500">Submitted By</p>
                        <p className="text-sm text-slate-300 font-semibold">{selectedExpense.owner}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-700 pt-4">
                      <h5 className="text-sm font-semibold text-white mb-3">Itemized Details:</h5>
                      <div className="space-y-2">
                        {selectedExpense.receipt.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-400">{item.name}</span>
                            <span className="text-slate-300 font-semibold">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t-2 border-slate-700 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white">Total Amount:</span>
                        <div className="text-right">
                          <p className="text-red-400 text-xs font-semibold">{selectedExpense.originalAmount}</p>
                          <p className="text-white text-lg font-bold">{selectedExpense.convertedAmount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-2">
                      <span className={getStatusBadge(selectedExpense.statusType, selectedExpense.status)}>
                        {selectedExpense.status}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Info className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 text-sm">Click on any expense row to view receipt details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}