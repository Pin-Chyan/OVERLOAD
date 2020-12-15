async function applyFilters(){
    var minPop = document.getElementById('minPop').value;
    var ageRange = document.getElementById('ageDiff').value;
    var distance = document.getElementById('DistanceDiff').value;
    var tags = document.getElementById('interests').value;

    var query = "/api/search?id=2";

    if (ageRange){
        query += "&ageRange=" + ageRange;
    }
    if (distance){
        query += "&distance=" + distance;
    }

    const response = await fetch(query);
    console.log(query);
    const data = await response.json();
    console.log(data);
}

function replace() {
    var inject = document.getElementById("matchesList");
    // clean default
    inject.innerHTML = "";

    i = 0;
    while (i++ < 6) {
        var col = document.createElement("div");
        col.className = "col-lg-4";
        
        var anchor = document.createElement("a");
        anchor.setAttribute("href","/home");

        var img = document.createElement("img");
        img.className = "shadow-lg img-300";
        img.alt = "profile_img";
        img.src = "https://i.pinimg.com/564x/7c/32/31/7c32313848b48fb9a564cfa312999c84.jpg";
        anchor.append(img);
        col.append(anchor);
        
        var p = document.createElement("p");
        p.className = "caveat rem-profile";
        // username
        p.appendChild(document.createTextNode("Aniva"))
        p.appendChild(document.createElement("br"));
        // distance
        p.appendChild(document.createTextNode("10 Milers"))
        p.appendChild(document.createElement("br"));
        // age
        p.appendChild(document.createTextNode("21"))

        col.append(p);
        inject.append(col);
    }
}
