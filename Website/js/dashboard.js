function logout() {
    window.location.replace("/");
    localStorage.clear()
    sessionStorage.clear();
}

const logoutbtn = document.getElementById("btn-logout");
if (logoutbtn)
    logoutbtn.addEventListener("click", logout);


async function Authenticate() {
    let access_token = sessionStorage.getItem('token');

    if (!access_token)
        window.location.assign('/');

    // Send request to BE to confirm SessionToken else log user out
    try {
        const response = await fetch(`http://127.0.0.1:8000/user/authenticate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${access_token}`
            }
        });

        if (!response.ok) {
            window.location.assign('/');
        }

        const data = await response.json();
        console.log('Success:', data);
        return data
    }
    catch {
        const message = "Failed to authenticate";
        return JSON.stringify(message);
    }
}


window.onload = (event) => {
    Authenticate();
};