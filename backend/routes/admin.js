const express = require('express');
const router = express.Router();
const { User, Expense, Company, sequelize } = require('../models');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Get all users (admin only)
router.get('/users', auth, roles(['admin']), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, companyId } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    
    if (role) {
      whereClause.role = role;
    }
    
    if (companyId) {
      whereClause.companyId = companyId;
    }

    const users = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'name']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        users: users.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(users.count / limit),
          totalItems: users.count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// Get all expenses (admin/manager only)
router.get('/expenses', auth, roles(['admin', 'manager']), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category, userId, companyId } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    
    if (status) {
      whereClause.status = status;
    }
    
    if (category) {
      whereClause.category = category;
    }

    const includeClause = [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'role'],
        where: companyId ? { companyId } : undefined
      }
    ];

    if (userId) {
      whereClause.userId = userId;
    }

    const expenses = await Expense.findAndCountAll({
      where: whereClause,
      include: includeClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        expenses: expenses.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(expenses.count / limit),
          totalItems: expenses.count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: error.message
    });
  }
});

// Get dashboard statistics
router.get('/dashboard', auth, roles(['admin', 'manager']), async (req, res) => {
  try {
    const { companyId } = req.query;
    const whereClause = companyId ? { companyId } : {};

    // Get total expenses count
    const totalExpenses = await Expense.count({
      include: [
        {
          model: User,
          as: 'user',
          where: whereClause
        }
      ]
    });

    // Get expenses by status
    const expensesByStatus = await Expense.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      include: [
        {
          model: User,
          as: 'user',
          where: whereClause,
          attributes: []
        }
      ],
      group: ['status']
    });

    // Get total amount by status
    const amountByStatus = await Expense.findAll({
      attributes: [
        'status',
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      include: [
        {
          model: User,
          as: 'user',
          where: whereClause,
          attributes: []
        }
      ],
      group: ['status']
    });

    // Get recent expenses
    const recentExpenses = await Expense.findAll({
      include: [
        {
          model: User,
          as: 'user',
          where: whereClause,
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        totalExpenses,
        expensesByStatus,
        amountByStatus,
        recentExpenses
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

// Update user role
router.put('/users/:id/role', auth, roles(['admin']), async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.update({ role });

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
});

module.exports = router;
