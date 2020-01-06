const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const msg_schem = require('./models/chats.models');
const client = require('socket.io').listen(4001).sockets;
const exp = require('./socket/socket');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('./config/passport.js')(passport);

var connectedUsers = [];
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
const imgRoutes = require('./routes/image.routes.js');

app.use('/users', userRoutes);
app.use('/chats', chatRoutes);
app.use('/img', imgRoutes);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
