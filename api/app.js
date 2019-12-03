const express = require('express');
const Joi = require('joi');
const routes = require('./routes/routes.js')
const app = express();

app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));