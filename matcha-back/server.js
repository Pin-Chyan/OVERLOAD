require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const defaultRoute = require('./routes/defaultData.js');

app.use(cors());
app.use(bodyParser());
app.use(express.json({limit: '50mb'}));
app.use('/default', defaultRoute);
app.listen(process.env.HOSTPORT, () => {
    console.log(`Server is running on port: ${process.env.HOSTPORT}`);
});


