const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 255]
    }
  },
  role: {
    type: DataTypes.ENUM('employee', 'manager', 'admin'),
    allowNull: false,
    defaultValue: 'employee'
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  managerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  profileImage: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
  indexes: []
});

// Define associations
User.associate = (models) => {
  // User belongs to Company
  User.belongsTo(models.Company, {
    foreignKey: 'companyId',
    as: 'company'
  });

  // User belongs to Manager (self-referential)
  User.belongsTo(models.User, {
    foreignKey: 'managerId',
    as: 'manager'
  });

  // User has many direct reports (employees)
  User.hasMany(models.User, {
    foreignKey: 'managerId',
    as: 'directReports'
  });

  // User has many Expenses
  User.hasMany(models.Expense, {
    foreignKey: 'userId',
    as: 'expenses'
  });

  // User can approve many expenses
  User.hasMany(models.Expense, {
    foreignKey: 'approvedBy',
    as: 'approvedExpenses'
  });

  // User can be an approver in sequences
  User.hasMany(models.ApproverSequence, {
    foreignKey: 'approverId',
    as: 'approverSequences'
  });
};

module.exports = User;
