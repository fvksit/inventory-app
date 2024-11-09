const sequelize = require('../config/database');
const Inventory = require('./Inventory');
const Category = require('./Category');

// Define relationships
Category.hasMany(Inventory, { foreignKey: 'categoryId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Inventory.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

const db = {
    sequelize,
    Inventory,
    Category
};

async function syncDatabase() {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

// Run the function to sync the database
syncDatabase();

module.exports = db;
