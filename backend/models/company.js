const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [2, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'United States'
  },
  countryCode: {
    type: DataTypes.STRING(3),
    allowNull: true
  },
  postalCode: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  taxId: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: 'USD',
    validate: {
      isIn: [['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD']]
    }
  },
  timezone: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'UTC'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  logo: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'companies',
  timestamps: true,
  underscored: true,
  indexes: []
});

// Define associations
Company.associate = (models) => {
  // Company has many Users
  Company.hasMany(models.User, {
    foreignKey: 'companyId',
    as: 'users'
  });

  // Company has many Expenses
  Company.hasMany(models.Expense, {
    foreignKey: 'companyId',
    as: 'expenses'
  });

  // Company has many Approval Rules
  Company.hasMany(models.ApprovalRule, {
    foreignKey: 'companyId',
    as: 'approvalRules'
  });
};

module.exports = Company;
