getData();
async function getData() {
        // user selected on
        const queryString = window.location.search;
        f_id = queryString.slice(1)
        console.log(f_id);

        // id of relative user found for match
        const response = await fetch('api/usr/me?id=' + id);
        const data = await response.json();

        // id of relative user found for match
        const userresponse = await fetch('api/usr/me?id=' + f_id);
        const userdata = await userresponse.json();

        // fame data of personal
        const fresponse = await fetch('api/likes/getfame', {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                // id of the userfound in homepage
                'id': f_id,
            })
        })
        const fdata = await fresponse.json();



        console.log(data);
        var img = document.getElementById('img1');
        if (userdata.img1 === undefined || userdata.img1 == null || userdata.img1 <= 0) {
            img.src = "https://i.imgur.com/GnBY9ja.jpg";
        } else {
            img.src = userdata.img1;
        }
        document.getElementById('personal').innerHTML = userdata.name + " " + userdata.surname + ", " + userdata.age;
        document.getElementById('bio').innerHTML = userdata.bio;
        // gender
        if (userdata.gender = 1) {
            document.getElementById("gender").innerHTML= "Female";
        }
        if (userdata.gender = -1) {
            document.getElementById("gender").innerHTML= "Male";
        };
        document.getElementById('location').innerHTML = userdata.location;
        document.getElementById('fame').innerHTML = "Fame: " + fdata;

    }
    function like() {
        const response = fetch('api/likes/like', {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                // id of the userfound in homepage
                'id': id,
                'target': f_id,
            })
        })
        getData();
    }
    
    function block() {
        const response = fetch('api/likes/block', {
            method : 'POST',
            mode : 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                // id of current user
                'id': id,
                //  target if of block user
                'target': f_id,
            })
        })
    }