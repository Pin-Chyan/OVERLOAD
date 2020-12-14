recents()
async function recents(){
    // var recentDiv = `
    // div(class="media")
    //     img.img-cover(src="https://i.pinimg.com/736x/5a/e2/a5/5ae2a545eb7bd167984c1dfc792e2776.jpg" alt="user" width="50" height="50" class="rounded-circle")
    //     div(class="media-body ml-4")
    //         div(class="d-flex align-items-center justify-content-between mb-1")
    //             h6(class="mb-0") Neko
    //             small(class="small font-weight-bold") 25 Dec
    //         p(class="font-italic mb-0 text-small") Just some bull`
    // document.getElementById("matchedUsers").innerHTML = recentDiv;
}


function recentsDiv(image){
    // var aElement = document.createElement('a');
    // aElement.class = "list-group-item list-group-item-action active text-white rounded-0";

    // var mediaDiv = document.createElement('div');
    // mediaDiv.class = "media";

    // var image = document.createElement('img');

}

document.getElementById('button-addon2').addEventListener('click', function () {
    var motherOfAll = document.getElementById("chatDisplay");
    i = 0;
	$("#chatDisplay").empty();
    while (i++ < 1) {
        //  main sender div
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
        text.textContent = "Test which is a new approach all solutions";
        sender_mes.append(text);
        sender_body.append(sender_mes);

        // time of text
        var time = document.createElement("p");
        time.className = "small text-muted";
        time.textContent = "12:00 PM | Aug 13";
        sender_body.append(time);
        sender.append(sender_body);
        motherOfAll.append(sender);
    }

    i = 0;
    while (i++ < 1) {
        //  main receiver div
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
        r_text.textContent = "Test which is a new approach to have all solutions";
        receiver_mes.append(r_text);
        receiver_body.append(receiver_mes);

        // time of text
        var r_time = document.createElement("p");
        r_time.className = "small text-muted";
        r_time.textContent = "12:00 PM | Aug 13";
        receiver_body.append(r_time);
        receiver.append(receiver_body);
        motherOfAll.append(receiver);
    }

});