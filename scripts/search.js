var userArray;

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
}

async function applyFilters(){
    var minPop = document.getElementById('minPop').value;
    var ageRange = document.getElementById('ageDiff').value;
    var distance = document.getElementById('DistanceDiff').value;

    var query = "/api/search?id=" + id;

    if (ageRange){
        query += "&ageRange=" + ageRange;
    }
    if (distance){
        query += "&distance=" + distance;
    }
    if (minPop){
        query += "&minFame=" + minPop;
    }
    
    const response = await fetch(query);
    console.log(query);
    const data = await response.json();
    // console.log(data);
    userArray = data;
    console.log(userArray);

    // sorting frontend work with bottom part
    var inject = document.getElementById("matchesList");
    // clean default
    inject.innerHTML = "";

    console.log(document.getElementById('AgeGap'.value));
    if(document.getElementById('AgeGap').value == "ascending") {
        userArray.sort(compareValues('age', 'asc'));
    }
    if(document.getElementById('AgeGap').value == "descending") {
        userArray.sort(compareValues('age', 'desc'));
    }

    if(document.getElementById('popularity').value == "ascending") {
        userArray.sort(compareValues('fame', 'asc'));
    }
    if(document.getElementById('popularity').value == "descending") {
        userArray.sort(compareValues('fame', 'desc'));
    }

    if(document.getElementById('distance').value == "ascending") {
        userArray.sort(compareValues('distance', 'asc'));
    }
    if(document.getElementById('distance').value == "descending") {
        userArray.sort(compareValues('distance', 'desc'));
    }

    // if(document.getElementById('sP').value == "ascending") {
    //     userArray.sort(compareValues('sexual_pref', 'asc'));
    // }
    // if(document.getElementById('sP').value == "descending") {
    //     userArray.sort(compareValues('sexual_pref', 'desc'));
    // }

    var arrayLength = userArray.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(userArray[i]);
        //Do something
        var col = document.createElement("div");
        col.className = "col-lg-4";
        
        var anchor = document.createElement("a");
        anchor.setAttribute("href","/match?"+ userArray[i].id);

        var img = document.createElement("img");
        img.className = "shadow-lg img-300";
        img.alt = "profile_img";
        img.src = userArray[i].img1;
        if (img.src.value === undefined || img.src.value == null || img.src.value <= 0) {
            img.src = "https://cdn.discordapp.com/attachments/631078804613496862/798850646421929994/Du_ylqyXQAAxIST.png";
        }
        anchor.append(img);
        col.append(anchor);
        
        var p = document.createElement("p");
        p.className = "caveat rem-profile";
        // username
        p.appendChild(document.createTextNode(userArray[i].name));
        p.appendChild(document.createElement("br"));
        // distance
        p.appendChild(document.createTextNode(userArray[i].distance + " km"));
        p.appendChild(document.createElement("br"));
        // age
        p.appendChild(document.createTextNode(userArray[i].age));

        col.append(p);
        inject.append(col);
    }

}

// function replace() {
    

//     // i = 0;
//     // while (i++ < 6) {
//     //     var col = document.createElement("div");
//     //     col.className = "col-lg-4";
        
//     //     var anchor = document.createElement("a");
//     //     anchor.setAttribute("href","/home");

//     //     var img = document.createElement("img");
//     //     img.className = "shadow-lg img-300";
//     //     img.alt = "profile_img";
//     //     img.src = "https://i.pinimg.com/564x/7c/32/31/7c32313848b48fb9a564cfa312999c84.jpg";
//     //     anchor.append(img);
//     //     col.append(anchor);
        
//     //     var p = document.createElement("p");
//     //     p.className = "caveat rem-profile";
//     //     // username
//     //     p.appendChild(document.createTextNode("Aniva"))
//     //     p.appendChild(document.createElement("br"));
//     //     // distance
//     //     p.appendChild(document.createTextNode("10 Milers"))
//     //     p.appendChild(document.createElement("br"));
//     //     // age
//     //     p.appendChild(document.createTextNode("21"))

//     //     col.append(p);
//     //     inject.append(col);
//     // }
// }
