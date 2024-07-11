import { handleFormSubmit } from './common.js';

// Create account function
async function createAccount(event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {
        const result = await handleFormSubmit('/user/create', formData);
    } catch (error) {
        // Handle account creation error (e.g., show error message to user)
    }
}

// Add event listeners to your forms
const createAccountForm = document.getElementById("createAccountForm");
if (createAccountForm)
    createAccountForm.addEventListener("submit", createAccount);