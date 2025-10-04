const { sequelize, syncDatabase } = require('../db/connection');
const models = require('../models');

const migrate = async () => {
  try {
    console.log('🔄 Starting database migration...');
    
    // Test connection first
    const isConnected = await models.sequelize.authenticate();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }
    
    // Sync database (create tables)
    await syncDatabase(false); // false = don't force recreate tables
    
    console.log('✅ Database migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrate();
