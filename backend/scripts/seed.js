const { User, Company, ApprovalRule, ApproverSequence } = require('../models');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create a default company
    const company = await Company.create({
      name: 'Default Company',
      description: 'Default company for testing',
      currency: 'USD',
      timezone: 'UTC'
    });

    console.log('✅ Company created:', company.name);

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      companyId: company.id
    });

    console.log('✅ Admin user created:', admin.email);

    // Create manager user
    const managerPassword = await bcrypt.hash('manager123', 12);
    const manager = await User.create({
      name: 'Manager User',
      email: 'manager@example.com',
      password: managerPassword,
      role: 'manager',
      companyId: company.id
    });

    console.log('✅ Manager user created:', manager.email);

    // Create employee user
    const employeePassword = await bcrypt.hash('employee123', 12);
    const employee = await User.create({
      name: 'Employee User',
      email: 'employee@example.com',
      password: employeePassword,
      role: 'employee',
      companyId: company.id
    });

    console.log('✅ Employee user created:', employee.email);

    // Create approval rule
    const approvalRule = await ApprovalRule.create({
      name: 'Default Approval Rule',
      description: 'Default approval rule for expenses',
      conditions: {
        amountRange: { min: 0, max: 10000 },
        categories: ['travel', 'meals', 'accommodation', 'transport', 'office_supplies', 'entertainment', 'training', 'other']
      },
      companyId: company.id,
      createdBy: admin.id,
      priority: 1
    });

    console.log('✅ Approval rule created:', approvalRule.name);

    // Create approver sequence
    await ApproverSequence.create({
      ruleId: approvalRule.id,
      approverId: manager.id,
      sequenceOrder: 1,
      isRequired: true
    });

    console.log('✅ Approver sequence created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Default users created:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Manager: manager@example.com / manager123');
    console.log('Employee: employee@example.com / employee123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
