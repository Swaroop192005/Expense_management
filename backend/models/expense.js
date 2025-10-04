const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01,
      isDecimal: true
    }
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: 'USD',
    validate: {
      isIn: [['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD']]
    }
  },
  category: {
    type: DataTypes.ENUM(
      'travel',
      'meals',
      'accommodation',
      'transport',
      'office_supplies',
      'entertainment',
      'training',
      'other'
    ),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  },
  receiptImage: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  approvedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  approvalComments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  projectCode: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  vendor: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  isReimbursable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  originalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  exchangeRate: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: true
  }
}, {
  tableName: 'expenses',
  timestamps: true,
  underscored: true,
  indexes: []
});

// Define associations
Expense.associate = (models) => {
  // Expense belongs to User (creator)
  Expense.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });

  // Expense belongs to User (approver)
  Expense.belongsTo(models.User, {
    foreignKey: 'approvedBy',
    as: 'approver'
  });

  // Expense belongs to Company
  Expense.belongsTo(models.Company, {
    foreignKey: 'companyId',
    as: 'company'
  });
};

module.exports = Expense;
