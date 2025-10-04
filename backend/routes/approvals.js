const express = require('express');
const router = express.Router();
const { Expense, User, ExpenseApproval, Company } = require('../models');
const auth = require('../middleware/auth');

// Get pending approvals for the authenticated user (manager/admin)
router.get('/pending', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const pendingApprovals = await ExpenseApproval.findAndCountAll({
      where: {
        approverId: req.user.userId,
        status: 'pending'
      },
      include: [
        {
          model: Expense,
          as: 'expense',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email', 'department']
            },
            {
              model: Company,
              as: 'company',
              attributes: ['id', 'name', 'currency']
            }
          ]
        }
      ],
      order: [['createdAt', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        approvals: pendingApprovals.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(pendingApprovals.count / limit),
          totalItems: pendingApprovals.count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get pending approvals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending approvals',
      error: error.message
    });
  }
});

// Get approval history for the authenticated user
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
      approverId: req.user.userId
    };

    if (status) {
      whereClause.status = status;
    }

    const approvalHistory = await ExpenseApproval.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Expense,
          as: 'expense',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email', 'department']
            }
          ]
        }
      ],
      order: [['updatedAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        approvals: approvalHistory.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(approvalHistory.count / limit),
          totalItems: approvalHistory.count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get approval history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching approval history',
      error: error.message
    });
  }
});

// Approve an expense
router.post('/:approvalId/approve', auth, async (req, res) => {
  try {
    const { approvalId } = req.params;
    const { comments } = req.body;

    const approval = await ExpenseApproval.findByPk(approvalId, {
      include: [
        {
          model: Expense,
          as: 'expense',
          include: [
            {
              model: User,
              as: 'user'
            }
          ]
        }
      ]
    });

    if (!approval) {
      return res.status(404).json({
        success: false,
        message: 'Approval not found'
      });
    }

    if (approval.approverId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to approve this expense'
      });
    }

    if (approval.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This approval has already been processed'
      });
    }

    // Update approval status
    await approval.update({
      status: 'approved',
      comments: comments || '',
      approvedAt: new Date()
    });

    // Check if this completes the approval process
    await checkApprovalCompletion(approval.expenseId);

    res.json({
      success: true,
      message: 'Expense approved successfully',
      data: { approval }
    });
  } catch (error) {
    console.error('Approve expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving expense',
      error: error.message
    });
  }
});

// Reject an expense
router.post('/:approvalId/reject', auth, async (req, res) => {
  try {
    const { approvalId } = req.params;
    const { comments } = req.body;

    if (!comments || comments.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Comments are required when rejecting an expense'
      });
    }

    const approval = await ExpenseApproval.findByPk(approvalId, {
      include: [
        {
          model: Expense,
          as: 'expense'
        }
      ]
    });

    if (!approval) {
      return res.status(404).json({
        success: false,
        message: 'Approval not found'
      });
    }

    if (approval.approverId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to reject this expense'
      });
    }

    if (approval.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This approval has already been processed'
      });
    }

    // Update approval status
    await approval.update({
      status: 'rejected',
      comments: comments,
      approvedAt: new Date()
    });

    // Reject the entire expense
    await Expense.update(
      { status: 'rejected' },
      { where: { id: approval.expenseId } }
    );

    res.json({
      success: true,
      message: 'Expense rejected successfully',
      data: { approval }
    });
  } catch (error) {
    console.error('Reject expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting expense',
      error: error.message
    });
  }
});

// Get approval statistics for dashboard
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [pendingCount, approvedCount, rejectedCount] = await Promise.all([
      ExpenseApproval.count({
        where: {
          approverId: userId,
          status: 'pending'
        }
      }),
      ExpenseApproval.count({
        where: {
          approverId: userId,
          status: 'approved'
        }
      }),
      ExpenseApproval.count({
        where: {
          approverId: userId,
          status: 'rejected'
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
        total: pendingCount + approvedCount + rejectedCount
      }
    });
  } catch (error) {
    console.error('Get approval stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching approval statistics',
      error: error.message
    });
  }
});

// Check if approval process is complete and update expense status
async function checkApprovalCompletion(expenseId) {
  try {
    const expense = await Expense.findByPk(expenseId, {
      include: [
        {
          model: ExpenseApproval,
          as: 'approvals'
        }
      ]
    });

    if (!expense) return;

    const approvals = expense.approvals;
    const totalApprovals = approvals.length;
    const approvedCount = approvals.filter(a => a.status === 'approved').length;
    const rejectedCount = approvals.filter(a => a.status === 'rejected').length;

    // If any approval is rejected, reject the entire expense
    if (rejectedCount > 0) {
      await expense.update({ status: 'rejected' });
      return;
    }

    // Check if all required approvals are completed
    const requiredApprovals = approvals.filter(a => a.isRequired);
    const requiredApproved = requiredApprovals.filter(a => a.status === 'approved').length;

    if (requiredApproved === requiredApprovals.length) {
      // All required approvals are complete
      await expense.update({ status: 'approved' });
    } else {
      // Check percentage-based approval
      const approvalPercentage = (approvedCount / totalApprovals) * 100;
      
      // Get the approval rule to check minimum percentage
      const approvalRule = await ApprovalRule.findOne({
        where: { id: approvals[0]?.ruleId }
      });

      if (approvalRule && approvalRule.minApprovalPercentage) {
        if (approvalPercentage >= approvalRule.minApprovalPercentage) {
          await expense.update({ status: 'approved' });
        }
      }
    }
  } catch (error) {
    console.error('Error checking approval completion:', error);
  }
}

module.exports = router;