import { handleFormSubmit } from './common.js';

// Login function
async function login(event) {
    event.preventDefault();
    const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {
        const result = await handleFormSubmit('/user/login', formData);

        if (result.status === "success") {
            // Store token securely
            sessionStorage.setItem('token', result.access_token);
            
            // Use window.location.assign for safer navigation
            window.location.assign('/dashboard.html');
        } else {
            console.log('Login failed. Please try again.');
        }
    } catch (error) {
        // Handle login error (e.g., show error message to user)
    }
}

const loginForm = document.getElementById("loginForm");
if (loginForm)
    loginForm.addEventListener("submit", login);