getData();
async function getData() {
    const response = await fetch('/getuser');
    const data = await response.json();
    console.log(data);
}