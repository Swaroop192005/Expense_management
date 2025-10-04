const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const ApproverSequence = sequelize.define('ApproverSequence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ruleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'approval_rules',
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
  sequenceOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Order in which this approver should approve (1, 2, 3, etc.)'
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Whether this approver is required or optional'
  },
  minAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Minimum amount for this approver to be involved'
  },
  maxAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Maximum amount for this approver to be involved'
  },
  categories: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of categories this approver handles'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'approver_sequences',
  timestamps: true,
  underscored: true,
  indexes: []
});

// Define associations
ApproverSequence.associate = (models) => {
  // ApproverSequence belongs to ApprovalRule
  ApproverSequence.belongsTo(models.ApprovalRule, {
    foreignKey: 'ruleId',
    as: 'rule'
  });

  // ApproverSequence belongs to User (approver)
  ApproverSequence.belongsTo(models.User, {
    foreignKey: 'approverId',
    as: 'approver'
  });
};

module.exports = ApproverSequence;
