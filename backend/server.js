const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const msg_schem = require('./models/chats.models');
const client = require('socket.io').listen(4001).sockets;

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to mongoDB");
})

// // connect to socket.io
// var socket = io.connect();
// socket.on('connect', () => update());
// function update() {
//   var str = (windows.location).toString();
//   socket.emit('update', {user: user.val(), id: socket.id, page:str});
// }
var prev = 'lol';
client.on('connection', function(socket) {

  // create a function to send a status
  console.log(socket.id);
  console.log(prev);
  if (prev != socket.id){
    connection.db.collection("chats", function(err, collection){
      collection.find({}).toArray(function(err, data){
        socket.emit('output', data);
    });
   });
  }
  prev = socket.id;
  sendStatus = function(s){
    socket.emit('staus', s);
  }
  
  // Get chats from the database
  //connection.on('error', console.error.bind(console, 'connection error:'));
  connection.on('connected', function () {
  
    connection.db.collection("chats", function(err, collection){
      collection.find({}).toArray(function(err, data){
        old = data;

    //Emit the messages
    socket.emit('output', data);
    });
   });
  });

  //Handle input events
  socket.on('input', function(data){
    let name = data.name;
    let message = data.message;

    //Check for name and message
    if (name == '' || message == ''){
      sendStatus('Please enter a name and message');
    } else {
      // Insert into the db
      var newMsg = new msg_schem({name: name, message: message});
      //connection.chats.insertOne({name: name, message: message}, function(){
      newMsg.save(function(){
      client.emit('output', [data]);

        // Send status object
        sendStatus({
          message: 'Message sent',
          clear: true
        });
      });
    }
  });
  
  //Handle delete messages
  socket.on('clear', function(data){
    //Remove all chats from the collection
    chat.remove({}, function(){
      //Emit cleared
      socket.emit('Cleared');
    });
  });


});

const userRoutes = require('./routes/user.routes.js');
const chatRoutes = require('./routes/chat.routes.js');

app.use('/users', userRoutes);
app.use('/chats', chatRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
