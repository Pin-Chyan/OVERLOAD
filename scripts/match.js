getData();
async function getData() {
        // id of relative user found for match
        const response = await fetch('api/usr/me?id=' + id);
        const data = await response.json();

        // fame data of personal
        // const fresponse = await fetch('api/likes/getfame', {
        //     method : 'POST',
        //     mode : 'cors',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body : JSON.stringify({
        //         // id of the userfound in homepage
        //         'id': id_2,
        //     })
        // })
        // const fdata = await fresponse.json();

        console.log(data);
        var img = document.getElementById('img1');
        if (data.img1 === undefined || data.img1 == null || data.img1 <= 0) {
            img.src = "https://i.imgur.com/GnBY9ja.jpg";
        } else {
            img.src = data.img1;
        }
        document.getElementById('personal').innerHTML = data.name + " " + data.surname + ", " + data.age;
        document.getElementById('bio').innerHTML = data.bio;
        // gender
        if (data.gender = 1) {
            document.getElementById("gender").innerHTML= "Female";
        }
        if (data.gender = -1) {
            document.getElementById("gender").innerHTML= "Male";
        };
        document.getElementById('location').innerHTML = data.location;
        // document.getElementById('fame').innerHTML = "Fame: " + fdata;
}