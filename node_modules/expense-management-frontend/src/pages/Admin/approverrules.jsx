import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ApprovalRulesAdmin() {
  const [availableUsers] = useState([
    'John',
    'Mitchell',
    'Andreas',
    'Sarah',
    'Jane Smith',
    'Bob Wilson',
    'Emily Davis',
    'Michael Brown'
  ]);

  const [formData, setFormData] = useState({
    user: '',
    description: '',
    manager: 'sarah',
    approvers: [
      { name: 'John', required: true },
      { name: 'Mitchell', required: false },
      { name: 'Andreas', required: false }
    ],
    approversSequence: false,
    minApprovalPercentage: ''
  });

  const [showManagerInfo, setShowManagerInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleApproverChange = (index, field, value) => {
    const newApprovers = [...formData.approvers];
    newApprovers[index][field] = value;
    setFormData({
      ...formData,
      approvers: newApprovers
    });
  };

  const addApprover = () => {
    setFormData({
      ...formData,
      approvers: [...formData.approvers, { name: '', required: false }]
    });
  };

  const removeApprover = (index) => {
    const newApprovers = formData.approvers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      approvers: newApprovers
    });
  };

  const handleSubmit = () => {
    console.log('Approval rule created:', formData);
    alert('Approval rule created successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto bg-gray-700 rounded-lg shadow-2xl overflow-hidden border border-gray-600">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-center text-xl font-bold tracking-wide text-white">
            Admin View (Approval Rules)
          </h1>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* User Field */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">User</label>
                <input
                  type="text"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  placeholder="Enter user"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Description about rules</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="e.g., Approval rule for miscellaneous expenses"
                  rows="3"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Manager */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Manager:</label>
                <div className="relative">
                  <select
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    onFocus={() => setShowManagerInfo(true)}
                    onBlur={() => setTimeout(() => setShowManagerInfo(false), 200)}
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="sarah">sarah</option>
                    <option value="jane">Jane Smith</option>
                    <option value="john">John Doe</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                {/* Dynamic Dropdown Info Box */}
                {showManagerInfo && (
                  <div className="mt-3 p-3 bg-gray-800 border border-gray-600 rounded-lg text-xs text-gray-300 leading-relaxed">
                    <p className="font-semibold mb-1">Dynamic dropdown</p>
                    <p>Initially the manager set on user record should be set, admin can change manager for approval if required.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Approvers Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-300">Approvers</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isManagerApprover"
                      className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-400">Is manager an approver?</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-3 leading-relaxed">
                    If this field is checked then by default the expense request need to go to his/her manager first, before going to other approvers
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 text-xs font-semibold text-gray-300">User</div>
                      <div className="w-24 text-xs font-semibold text-gray-300">Required</div>
                    </div>

                    {formData.approvers.map((approver, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-sm text-gray-300 w-6">{index + 1}</span>
                          <div className="flex-1 relative">
                            <select
                              value={approver.name}
                              onChange={(e) => handleApproverChange(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select user</option>
                              {availableUsers.map((user) => (
                                <option key={user} value={user}>{user}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div className="w-24 flex items-center justify-center gap-2">
                          <input
                            type="checkbox"
                            checked={approver.required}
                            onChange={(e) => handleApproverChange(index, 'required', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          {index > 0 && (
                            <button
                              onClick={() => removeApprover(index)}
                              className="text-red-400 hover:text-red-300 text-xs"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addApprover}
                      className="text-blue-400 hover:text-blue-300 text-xs font-medium mt-2"
                    >
                      + Add Approver
                    </button>
                  </div>

                  <div className="mt-3 text-xs text-gray-400 leading-relaxed">
                    When any user approver is required then approval sequence becomes invalid.
                  </div>
                </div>
              </div>

              {/* Approvers Sequence */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    name="approversSequence"
                    checked={formData.approversSequence}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="text-sm font-semibold text-gray-300">Approvers Sequence:</label>
                </div>
                <div className="text-xs text-gray-400 leading-relaxed ml-6">
                  If this field is ticked true then the above mentioned sequence of approvers matters, that is first the request goes to John, if he approves/rejects then only request goes to mitchell and so on.
                  <br /><br />
                  If the required approver rejects the request, then expense request is autorejected.
                  <br /><br />
                  If not ticked then send approver request to all approvers at the same time.
                </div>
              </div>

              {/* Minimum Approval Percentage */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Minimum Approval percentage: _____ %</label>
                <input
                  type="number"
                  name="minApprovalPercentage"
                  value={formData.minApprovalPercentage}
                  onChange={handleChange}
                  placeholder="Enter percentage"
                  className="w-40 px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="mt-2 text-xs text-gray-400 leading-relaxed">
                  Specify the number of percentage approvers required in order to get the request approved.
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              CREATE APPROVAL RULE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}