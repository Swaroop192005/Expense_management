import { useState } from 'react';
import { BarChart3, CheckCircle, Users } from 'lucide-react';

export default function ExpenseFlowDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Card */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">
              EXPENSE MANAGEMENT SYSTEM DASHBOARD
            </h1>
          </div>

          {/* Welcome Section */}
          <div className="bg-slate-700 px-8 py-10">
            <h2 className="text-center text-2xl font-bold mb-4 text-white">
              WELCOME TO EXPENSEFLOW
            </h2>
            <p className="text-center text-sm text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your expense management with our comprehensive solution. Track expenses, manage approvals, and maintain financial oversight - all in one place.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/login" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
                LOGIN TO ACCOUNT
              </a>
              <a href="/signup" className="bg-transparent border-2 border-blue-600 text-blue-400 px-10 py-3 rounded-lg font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all">
                CREATE ACCOUNT
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="px-8 py-10 bg-slate-800">
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Expense Tracking */}
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-center font-bold text-white mb-3 text-sm">EXPENSE TRACKING</h3>
                <p className="text-center text-xs text-slate-400 leading-relaxed">
                  Submit and track expenses with OCR receipt scanning
                </p>
              </div>

              {/* Approval Workflow */}
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-green-500 transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <h3 className="text-center font-bold text-white mb-3 text-sm">APPROVAL WORKFLOW</h3>
                <p className="text-center text-xs text-slate-400 leading-relaxed">
                  Flexible multi-level approval rules and management
                </p>
              </div>

              {/* User Management */}
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-purple-500 transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-center font-bold text-white mb-3 text-sm">USER MANAGEMENT</h3>
                <p className="text-center text-xs text-slate-400 leading-relaxed">
                  Role-based access for admins, managers, and employees
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
