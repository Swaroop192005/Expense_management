const { sequelize } = require('../db/connection');

// Import all models
const User = require('./user');
const Company = require('./company');
const Expense = require('./expense');
const ApprovalRule = require('./approvalrule');
const ApproverSequence = require('./approversequence');
const ExpenseApproval = require('./expenseapproval');

// Define all models
const models = {
  User,
  Company,
  Expense,
  ApprovalRule,
  ApproverSequence,
  ExpenseApproval
};

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export models and sequelize instance
module.exports = {
  ...models,
  sequelize
};
