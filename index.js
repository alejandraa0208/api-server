'use strict';

require('dotenv').config();
const { sequelize } = require('./lib/models/index');
const app = require('./lib/server');
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database synchronization failed:', error);
  }
}

startServer();
