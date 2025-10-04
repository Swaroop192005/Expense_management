import { useState } from 'react';
import { Upload, Save, X, ArrowLeft } from 'lucide-react';

export default function NewExpenseForm() {
  const [formData, setFormData] = useState({
    description: '',
    expenseDate: '',
    category: 'Travel',
    paidBy: 'Personal',
    remarks: '',
    amount: '',
    currency: 'USD'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting expense:', formData);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
  };

  const handleClear = () => {
    setFormData({
      description: '',
      expenseDate: '',
      category: 'Travel',
      paidBy: 'Personal',
      remarks: '',
      amount: '',
      currency: 'USD'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition mr-6">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Expenses</span>
            </button>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1300px] mx-auto px-8 lg:px-10 py-7">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-5">
            <h2 className="text-2xl font-bold text-white">NEW EXPENSE FORM</h2>
          </div>

          {/* Form Content */}
          <div className="px-10 py-10">
            {/* Row 1: Description and Expense Date */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 text-base font-semibold mb-3">
                  Description:
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description of expense"
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition text-base"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-base font-semibold mb-3">
                  Expense Date:
                </label>
                <input
                  type="date"
                  value={formData.expenseDate}
                  onChange={(e) => handleChange('expenseDate', e.target.value)}
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition text-base cursor-pointer"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Row 2: Category and Paid By */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 text-base font-semibold mb-3">
                  Category:
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition text-base appearance-none cursor-pointer"
                >
                  <option>Travel</option>
                  <option>Meals</option>
                  <option>Supplies</option>
                  <option>Entertainment</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-base font-semibold mb-3">
                  Paid By:
                </label>
                <select
                  value={formData.paidBy}
                  onChange={(e) => handleChange('paidBy', e.target.value)}
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition text-base appearance-none cursor-pointer"
                >
                  <option>Personal</option>
                  <option>Company Card</option>
                </select>
              </div>
            </div>

            {/* Row 3: Remarks */}
            <div className="mb-6">
              <label className="block text-gray-300 text-base font-semibold mb-3">
                Remarks:
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleChange('remarks', e.target.value)}
                placeholder="Additional notes or details"
                rows="3"
                className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition text-base resize-none"
              />
            </div>

            {/* Row 4: Total Amount and Currency */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 text-base font-semibold mb-3">
                  Total Amount:
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition text-base"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-base font-semibold mb-3">
                  Currency:
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition text-base appearance-none cursor-pointer"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>INR</option>
                  <option>JPY</option>
                </select>
              </div>
            </div>

            {/* Attach Receipt */}
            <div className="mb-10">
              <button className="w-full h-6 bg-gray-900 border-2 border-gray-700 hover:border-blue-500 hover:bg-gray-850 rounded-lg px-6 py-5 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center space-x-3">
                <Upload className="w-6 h-6" />
                <span className="text-lg font-bold">ATTACH RECEIPT</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-5 mb-8">
              <button
                onClick={handleSubmit}
                className="flex-1 min-w-[220px] h-6 bg-green border-2 border-green-600 hover:bg-green-900 text-white font-bold px-10 py-5 rounded-lg transition-all duration-200 shadow-lg text-lg justify-center flex items-center space-x-2"
              >
                SUBMIT EXPENSE
              </button>
              <button
                onClick={handleSaveDraft}
                className="flex-1 min-w-[220px] h-6 bg-transparent border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-700 text-gray-300 font-bold px-10 py-5 rounded-lg transition-all duration-200 text-lg justify-center flex items-center space-x-2"
              >
                SAVE DRAFT
              </button>
              <button
                onClick={handleClear}
                className="flex-1 min-w-[220px] h-6 bg-red border-2 border-red-600 hover:border-red-500 hover:bg-red-700 text-gray-300 font-bold px-10 py-5 rounded-lg transition-all duration-200 text-lg justify-center flex items-center space-x-2"
              >
                CLEAR FORM
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-red-900 bg-opacity-20 border-l-4 border-red-500 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-1 bg-red-500 h-full mr-5 rounded"></div>
                <p className="text-lg text-red-300 italic leading-relaxed">
                  OCR auto-fills expense details from receipt images. Expenses can be submitted in any currency but will be displayed in company base currency for approvers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
