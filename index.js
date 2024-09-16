const express = require('express');
const db = require('./models'); 

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database synchronization with error handling
db.sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database and tables created successfully');
    app.listen(PORT, () => console.log(`Server is running on port localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
