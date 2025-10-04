const express = require('express');
const router = express.Router();
const { Expense, User, Company, ApprovalRule, ExpenseApproval } = require('../models');
const auth = require('../middleware/auth');
const currencyService = require('../services/currencyService');

// Get all expenses for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { userId: req.user.userId };
    
    if (status) {
      whereClause.status = status;
    }
    
    if (category) {
      whereClause.category = category;
    }

    const expenses = await Expense.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ],
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
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: error.message
    });
  }
});

// Get single expense by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.json({
      success: true,
      data: { expense }
    });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expense',
      error: error.message
    });
  }
});

// Create new expense
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      amount,
      currency,
      category,
      date,
      receiptImage,
      tags,
      paidBy,
      remarks
    } = req.body;

    // Get user and company info
    const user = await User.findByPk(req.user.userId, {
      include: [{ model: Company, as: 'company' }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Convert amount to company currency if different
    let convertedAmount = parseFloat(amount);
    let originalAmount = parseFloat(amount);
    let exchangeRate = 1;

    if (currency !== user.company.currency) {
      try {
        convertedAmount = await currencyService.convertCurrency(
          parseFloat(amount),
          currency,
          user.company.currency
        );
        exchangeRate = convertedAmount / parseFloat(amount);
      } catch (error) {
        console.error('Currency conversion error:', error);
        // Continue with original amount if conversion fails
      }
    }

    const expense = await Expense.create({
      title,
      description,
      amount: convertedAmount,
      originalAmount: originalAmount,
      currency: user.company.currency,
      originalCurrency: currency,
      exchangeRate,
      category,
      date: date || new Date(),
      receiptImage,
      tags: tags || [],
      paidBy: paidBy || 'Personal',
      remarks,
      userId: req.user.userId,
      companyId: user.companyId,
      status: 'pending'
    });

    // Trigger approval workflow
    await triggerApprovalWorkflow(expense, user);

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: { 
        expense: {
          ...expense.toJSON(),
          originalAmount: originalAmount,
          originalCurrency: currency,
          convertedAmount: convertedAmount,
          companyCurrency: user.company.currency
        }
      }
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating expense',
      error: error.message
    });
  }
});

// Update expense
router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    if (expense.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update expense that is not pending'
      });
    }

    const updatedExpense = await expense.update(req.body);

    res.json({
      success: true,
      message: 'Expense updated successfully',
      data: { expense: updatedExpense }
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating expense',
      error: error.message
    });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    if (expense.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete expense that is not pending'
      });
    }

    await expense.destroy();

    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting expense',
      error: error.message
    });
  }
});

// Trigger approval workflow for an expense
async function triggerApprovalWorkflow(expense, user) {
  try {
    // Find applicable approval rules
    const rules = await ApprovalRule.findAll({
      where: {
        companyId: user.companyId,
        isActive: true
      },
      include: [
        {
          model: User,
          as: 'sequences',
          through: { attributes: [] }
        }
      ]
    });

    // Find the most applicable rule based on amount and category
    let applicableRule = null;
    for (const rule of rules) {
      const conditions = rule.conditions;
      
      // Check amount range
      if (rule.amountRange) {
        const { min, max } = rule.amountRange;
        if (expense.amount < min || expense.amount > max) {
          continue;
        }
      }
      
      // Check category
      if (rule.categories && rule.categories.length > 0) {
        if (!rule.categories.includes(expense.category)) {
          continue;
        }
      }
      
      applicableRule = rule;
      break;
    }

    if (!applicableRule) {
      // No specific rule found, use default manager approval
      if (user.managerId) {
        await ExpenseApproval.create({
          expenseId: expense.id,
          approverId: user.managerId,
          status: 'pending',
          sequenceOrder: 1,
          isRequired: true
        });
      }
      return;
    }

    // Create approval requests based on rule
    const approvers = await User.findAll({
      where: {
        id: applicableRule.sequences.map(seq => seq.approverId)
      }
    });

    let sequenceOrder = 1;

    // If manager approval is required first
    if (applicableRule.isManagerApprover && user.managerId) {
      await ExpenseApproval.create({
        expenseId: expense.id,
        approverId: user.managerId,
        status: 'pending',
        sequenceOrder: sequenceOrder++,
        isRequired: true,
        ruleId: applicableRule.id
      });
    }

    // Add other approvers
    for (const approver of approvers) {
      await ExpenseApproval.create({
        expenseId: expense.id,
        approverId: approver.id,
        status: 'pending',
        sequenceOrder: sequenceOrder++,
        isRequired: true,
        ruleId: applicableRule.id
      });
    }

  } catch (error) {
    console.error('Error triggering approval workflow:', error);
  }
}

module.exports = router;
