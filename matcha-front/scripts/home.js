getData();
async function getData() {
    const response = await fetch('api/usr/me?id=2');
    const data = await response.json();
    console.log(data);
}

testpost();
async function testpost() {
    const response = await fetch('api/usr/img', {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            'id':2,
            'img1': 'https://pbs.twimg.com/profile_images/1087124894075236352/O9cDVYG__400x400.jpg'
        })
    })
    const data = await response.json();
    console.log(data);
}