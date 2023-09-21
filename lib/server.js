'use strict';

const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors()); 
app.use(express.json());

const foodRouter = require('./routes/food'); // Imports the foodRouter module from the routes folder. - sydney
const clothesRouter = require('./routes/clothes'); // Imports the clothesRouter module from the routes folder. - sydney

app.use('/food', foodRouter); // Mounts the foodRouter module on the /food route. - sydney
app.use('/clothes', clothesRouter); // Mounts the clothesRouter module on the /clothes route. - sydney

app.use(require('./error-handlers/404')); // Imports the 404 error handler module from the error-handlers folder. - sydney
app.use(require('./error-handlers/500')); // Imports the 500 error handler module from the error-handlers folder. - sydney

module.exports = app;
