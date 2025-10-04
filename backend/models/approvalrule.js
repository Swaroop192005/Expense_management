const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const ApprovalRule = sequelize.define('ApprovalRule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  conditions: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'JSON object containing rule conditions (amount ranges, categories, etc.)'
  },
  isManagerApprover: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether manager is required as first approver'
  },
  approversSequence: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether approvers must approve in sequence'
  },
  minApprovalPercentage: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Minimum percentage of approvers required for approval'
  },
  amountRange: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Amount range for this rule (min, max)'
  },
  categories: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Categories this rule applies to'
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Higher number means higher priority'
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'approval_rules',
  timestamps: true,
  underscored: true,
  indexes: []
});

// Define associations
ApprovalRule.associate = (models) => {
  // ApprovalRule belongs to Company
  ApprovalRule.belongsTo(models.Company, {
    foreignKey: 'companyId',
    as: 'company'
  });

  // ApprovalRule belongs to User (creator)
  ApprovalRule.belongsTo(models.User, {
    foreignKey: 'createdBy',
    as: 'creator'
  });

  // ApprovalRule has many ApproverSequences
  ApprovalRule.hasMany(models.ApproverSequence, {
    foreignKey: 'ruleId',
    as: 'sequences'
  });
};

module.exports = ApprovalRule;
