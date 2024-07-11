// Define the base URL for your API
const BASE_API_URL = "http://127.0.0.1:8000";


// Generic function to handle form submission
async function handleFormSubmit(endpoint, formData) {
    try {
        const response = await fetch(`${BASE_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { handleFormSubmit };