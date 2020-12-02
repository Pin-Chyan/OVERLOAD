require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// express config
app.use(cors());
// limit upload size to 50mb
app.use(express.json({limit: '50mb'}));

// using routes built in ./routes
app.use('/default', require('./routes/defaultData.js'));
app.use('/auth', require('./routes/auth.js'));

// server start listening on specifies port
app.listen(process.env.HOSTPORT, () => {
    console.log(`Server is running on port: ${process.env.HOSTPORT}`);
});
