const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

// Load environment variables from .env file 
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
    console.log(`Management-service running on http://localhost:${port}`);
});
