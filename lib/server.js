'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');

app.use('/food', foodRouter);
app.use('/clothes', clothesRouter);

app.use(require('./error-handlers/404'));
app.use(require('./error-handlers/500'));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

module.exports = app;
