import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Admin/login'
import Signup from './pages/Admin/signup'
import MainDashboard from './pages/Dashboard/mainPage'
import AdminDashboard from './pages/Admin/dashboard'
import EmployeeDashboard from './pages/Employee/Dashboard'
import ManagerDashboard from './pages/Manager/Dashboard'
import NewExpense from './pages/Employee/NewExpense'
import ManagerQueue from './pages/Manager/Queue'
import ApproverRules from './pages/Admin/approverrules'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/rules" element={<ApproverRules />} />
            <Route path="employee" element={<EmployeeDashboard />} />
            <Route path="employee/new-expense" element={<NewExpense />} />
            <Route path="manager" element={<ManagerDashboard />} />
            <Route path="manager/queue" element={<ManagerQueue />} />
          </Route>
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

function ProtectedRoute() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  // Redirect based on user role
  if (user.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />
  } else if (user.role === 'manager') {
    return <Navigate to="/dashboard/manager" replace />
  } else if (user.role === 'employee') {
    return <Navigate to="/dashboard/employee" replace />
  }
  
  return <Navigate to="/login" replace />
}

export default App
