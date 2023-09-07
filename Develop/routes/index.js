const express = require('express');

// Import our modular routers for /notes
const notesRoute = require('./notes');

const app = express();

app.use('/notes', notesRoute);

module.exports = app;