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