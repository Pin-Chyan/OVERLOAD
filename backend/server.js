const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const client = require('socket.io').listen(4000).sockets;

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb://localhost:3630/senpai', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to mongoDB Atlas");
})

client.on('connection', function(socket) {
  let chat = connection.collection('chats');

  // create a function to send a status
  sendStatus = function(s){
    socket.emit('staus', s);
  }

  // Get chats from the database
  chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
    if (err){
      throw err;
    }

    //Emit the messages
    socket.emit('output', res);
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
      chat.insert({name: name, message: message}, function(){
        client.emit('output', [data]);

        // Send status object
        sensStatus({
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

app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
