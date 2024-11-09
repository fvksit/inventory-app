require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const inventoryRoutes = require('./routes/inventory');
const categoryRoutes = require('./routes/category');

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/category', categoryRoutes);

// Sync database
db.sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));