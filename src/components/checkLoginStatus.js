export default function checkLoginStatus() {
    let isLogged = false;

    if (localStorage.getItem('token')) {
        isLogged = true;
        console.log("There is a token!");
    }
    return(isLogged);
}
