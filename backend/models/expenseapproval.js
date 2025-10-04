const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const ExpenseApproval = sequelize.define('ExpenseApproval', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  expenseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'expenses',
      key: 'id'
    }
  },
  approverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sequenceOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Order in which this approver should approve'
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Whether this approver is required'
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ruleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'approval_rules',
      key: 'id'
    }
  }
}, {
  tableName: 'expense_approvals',
  timestamps: true,
  underscored: true,
  indexes: []
});

// Define associations
ExpenseApproval.associate = (models) => {
  // ExpenseApproval belongs to Expense
  ExpenseApproval.belongsTo(models.Expense, {
    foreignKey: 'expenseId',
    as: 'expense'
  });

  // ExpenseApproval belongs to User (approver)
  ExpenseApproval.belongsTo(models.User, {
    foreignKey: 'approverId',
    as: 'approver'
  });

  // ExpenseApproval belongs to ApprovalRule
  ExpenseApproval.belongsTo(models.ApprovalRule, {
    foreignKey: 'ruleId',
    as: 'rule'
  });
};

module.exports = ExpenseApproval;
