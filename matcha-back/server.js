require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// express config
app.use(cors());
// limit upload size to 50mb
app.use(express.json({limit: '50mb'}));

// using routes built in ./routes
app.use('/auth', require('./routes/auth.js'));
app.use('/msg', require('./routes/msg.js'));
app.use('/usr', require('./routes/user.js'));
app.use('/search', require('./routes/search.js'));

// server start listening on specifies port
app.listen(process.env.HOSTPORT, () => {
    console.log(`Server is running on port: ${process.env.HOSTPORT}`);
});
