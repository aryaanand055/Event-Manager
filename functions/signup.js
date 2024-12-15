document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    try {
        const response = await fetch("http://localhost:8888/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Sign-up successful!');
            window.location.href = 'http://localhost:8888/login';  // Redirect to login page
        } else {
            alert(data.message);  // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    }
});
