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
    setupPasswordClickHandlers();
};

const add_password_modal_container = document.getElementById("add-password-modal-container");
const password_details_modal_container = document.getElementById("password-details-modal-container");

function showAddPasswordModal() {
    add_password_modal_container.style.display = "block";
}

function hideAddPasswordModal() {
    add_password_modal_container.style.display = "none";
}

function showPasswordDetailsModal(passwordId) {
    const passwordDetails = getPasswordDetails(passwordId);
    const detailsContent = document.getElementById("password-details-content");
    detailsContent.innerHTML = `
        <p><strong>Name:</strong> ${passwordDetails.name}</p>
        <p><strong>Username:</strong> ${passwordDetails.username}</p>
        <p><strong>Password:</strong> ${passwordDetails.password}</p>
    `;
    password_details_modal_container.style.display = "block";
}

function hidePasswordDetailsModal() {
    password_details_modal_container.style.display = "none";
}

function setupPasswordClickHandlers() {
    const passwordItems = document.querySelectorAll('.password-list li');
    passwordItems.forEach(item => {
        item.addEventListener('click', function() {
            const passwordId = this.getAttribute('data-id');
            showPasswordDetailsModal(passwordId);
        });
    });
}

// Mock function to get password details (replace with actual implementation)
function getPasswordDetails(passwordId) {
    // This should be replaced with an actual API call or database query
    const mockPasswords = {
        1: { name: "Email Account", username: "user@example.com", password: "strongpassword1" },
        2: { name: "Social Media", username: "socialuser", password: "strongpassword2" },
        3: { name: "Company Portal", username: "employee123", password: "strongpassword3" },
        4: { name: "Work Email", username: "work@example.com", password: "strongpassword4" },
        5: { name: "Banking", username: "bankuser", password: "strongpassword5" },
        6: { name: "Shopping", username: "shopuser", password: "strongpassword6" }
    };
    return mockPasswords[passwordId];
}

// Close modals when clicking outside
add_password_modal_container.addEventListener("click", function(event) {
    if (event.target === add_password_modal_container) {
        hideAddPasswordModal();
    }
});

password_details_modal_container.addEventListener("click", function(event) {
    if (event.target === password_details_modal_container) {
        hidePasswordDetailsModal();
    }
});

// Handle form submission
const addPasswordForm = document.getElementById("add-password-form");
addPasswordForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just log it and close the modal
    const formData = new FormData(addPasswordForm);
    console.log("Form submitted:", Object.fromEntries(formData));
    hideAddPasswordModal();
    addPasswordForm.reset();
});