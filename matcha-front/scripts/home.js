getData();
async function getData() {
    const response = await fetch('api/usr/me?id=2');
    const data = await response.json();
    console.log(data);
}