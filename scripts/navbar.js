getLoggedUser();
async function getLoggedUser() {
    const response = await fetch('api/usr/me?id=' + id);
    const data = await response.json();
    document.getElementById("loggedInUser").innerHTML= data.name;
}
