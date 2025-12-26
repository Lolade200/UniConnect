const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models'); // models/index.js

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Force sync database to recreate all tables
sequelize.sync({ force: true }) // drops + recreates tables
  .then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Failed to sync database:', err));
