loadRecents();

async function loadRecents(){
    const response = await fetch('/api/msg/getmychatrooms?id=' + id);
    const data = await response.json();

    var userBox = document.getElementById("userbox");
    userBox.innerHTML = "";

    var i = 0;
    var recentsDiv;
    console.log(data);  
    while(i < data.length){

        recentsDiv = null;
        if (id == data[i].usr1.id){
            recentsDiv = recentsTemplate(data[i].usr2, data[i].id, data[i].msg[data[i].msg.length - 1]);
        } else {
            recentsDiv = recentsTemplate(data[i].usr1, data[i].id, data[i].msg[data[i].msg.length - 1]);
        }
        userBox.append(recentsDiv);
        i++;
    }
    await loadChat(data[0].id);  
}

async function loadChat(chatroom){
    const response = await fetch('/api/msg/getmychatrooms?id=' + id);
    const data = await response.json();

    var i = 0;
    while(i < data.length){
        if (data[i].id == chatroom){
            console.log(data[i].msg);
            var chatDisplay = document.getElementById("chatDisplay");
            document.getElementById("sendButton").setAttribute('onclick', 'send(' + chatroom + ')');
            chatDisplay.innerHTML = "";
            data[i].msg.forEach(msg => {
                if (msg.sender == id){
                    chatDisplay.append(sentMsg(msg));
                } else {
                    chatDisplay.append(recMsg(msg));
                }
            });
        }
        i++;
    }
}

async function send(chatroom){
    var text = document.getElementById('inputMessage').value;

    if (text != null){
        const response = await fetch("/api/msg/send?id=" + id + "&chatroom=" + chatroom +"&msg=" + text);
        placeSentMessage(text);
    }
}

var socket = io();
socket.on('message', function(data) {
    console.log("socket");
    console.log(data);
    placeRecivedMessage(data);
})

function placeSentMessage(text){
    var chatDisplay = document.getElementById("chatDisplay");
    chatDisplay.append(sentMsg({
        msg:text,
        time:"now"
    }))
}

function placeRecivedMessage(msg){
    var chatDisplay = document.getElementById("chatDisplay");
    chatDisplay.append(recMsg({
        msg:msg.msg,
        time:msg.time
    }))
}

function sentMsg(msg){
    var receiver = document.createElement("div");
    receiver.className = "media w-50 ml-auto mb-3";
    receiver.id = "receiver_" + 1;
    
    // message
    var receiver_body = document.createElement("div");
    receiver_body.className = "media-body";

    // message box
    var receiver_mes = document.createElement("div");
    receiver_mes.className = "bg-primary rounded py-2 px-3 mb-2";

    // text paragraph
    var r_text = document.createElement("p");
    r_text.className = "text-small mb-0 text-white";
    r_text.textContent = msg.msg;
    receiver_mes.append(r_text);
    receiver_body.append(receiver_mes);

    // time of text
    var r_time = document.createElement("p");
    r_time.className = "small text-muted";
    r_time.textContent = msg.time;
    receiver_body.append(r_time);
    receiver.append(receiver_body);

    return receiver;
}

function recMsg(msg){
    var sender = document.createElement("div");
    sender.className = "media w-50 mb-3";
    sender.id = "sender_" + 1;

    // image
    var sender_img = document.createElement("img");
    sender_img.id = "senderimg_" + 1;
    sender_img.setAttribute('src', 'https://i.pinimg.com/736x/5a/e2/a5/5ae2a545eb7bd167984c1dfc792e2776.jpg');
    sender_img.setAttribute('alt', 'na');
    sender_img.setAttribute('height', '50px');
    sender_img.setAttribute('width', '50px');
    sender_img.className = "img-cover rounded-circle";
    sender.append(sender_img);
    
    // message
    var sender_body = document.createElement("div");
    sender_body.className = "media-body ml-3";

    // message box
    var sender_mes = document.createElement("div");
    sender_mes.className = "bg-light rounded py-2 px-3 mb-2";

    // text paragraph
    var text = document.createElement("p");
    text.className = "text-small mb-0 text-muted";
    text.textContent = msg.msg;
    sender_mes.append(text);
    sender_body.append(sender_mes);

    // time of text
    var time = document.createElement("p");
    time.className = "small text-muted";
    time.textContent = msg.time;
    sender_body.append(time);
    sender.append(sender_body);

    return sender;
}

function recentsTemplate(userData, chatroom, msg){
    var listsUser = document.createElement("div");
    listsUser.className = "list-group rounded-0";
    listsUser.id = "matchedUsers";

    var userInfo = document.createElement("a");
    userInfo.className = "list-group-item list-group-item-action base_color text-white rounded-0";
    userInfo.href = "#";
    console.log();
    userInfo.setAttribute('onclick', 'loadChat(' + chatroom + ')');
    
    var media = document.createElement("div");
    media.className = "media";

    var userImage = document.createElement("img");
    userImage.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgMxCPwCb8MwLHvgmo-Wi8XRWvWFxmas8oUw&usqp=CAU');
    if (userData.img1)
        userImage.setAttribute('src', userData.img1);
    userImage.setAttribute('alt', 'user');
    userImage.setAttribute('height', '50px');
    userImage.setAttribute('width', '50px');
    userImage.className = "img-cover rounded-circle";
    media.append(userImage);

    var box = document.createElement("div");
    box.className = "media-body ml-4";

    var boxinfo = document.createElement("div");
    boxinfo.className = "d-flex align-items-center justify-content-between mb-1";

    var name = document.createElement("h6");
    name.className = "mb-0 text-dark";
    name.textContent = userData.name;
    boxinfo.append(name);

    var date = document.createElement("small");
    date.className = "small font-weight-bold text-dark";
    if (msg)
        date.textContent = msg.time;
    boxinfo.append(date);
    box.append(boxinfo);

    var miniBio = document.createElement("p");
    miniBio.className = "font-italic mb-0 text-small text-dark";
    if (msg)
        miniBio.textContent = msg.msg;
    box.append(miniBio);
    media.append(box);
    userInfo.append(media);
    listsUser.append(userInfo);
    return listsUser;
}
