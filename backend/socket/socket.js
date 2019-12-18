module.exports = {
    sock : (socket, prev, connection, msg_schem, client, connected) => {

    // connected users handler

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
            var temp = 0;
            connected.find(function(element) {if (element == name) temp = 1;});
            if (temp == 1)
                console.log('connected');
            else
                connected.push(name);
            console.log(connected);
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
    }
}