const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const msg_schem = require('./models/chats.models');
const client = require('socket.io').listen(4001).sockets;
const exp = require('./socket/socket');
const authRoutes = require('./routes/auth.routes.js');

require('dotenv').config();
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.bodyParser({limit: '50mb'}));

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to mongoDB");
})

var prev = 'lol';
client.on('connection', socket => exp.sock(socket, prev, connection, msg_schem, client, connectedUsers));

const userRoutes = require('./routes/user.routes.js');
const chatRoutes = require('./routes/chat.routes.js');
const searchRoutes = require('./routes/search.routes.js');
const notificationRoutes = require('./routes/notification.routes');
const pingRoutes = require('./routes/ping.routes.js');

app.use('/users', userRoutes);
app.use('/chats', chatRoutes);
app.use('/auth', authRoutes);
app.use('/search', searchRoutes);
app.use('/inbox', notificationRoutes);
app.use('/ping', pingRoutes);
app.use('/users', userRoutes);
app.post('/upimg', (req,res) => {
    console.log(req.body);
    res.json("done");
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
