document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // For simplicity, assuming the login is successful (in a real-world scenario, this should be validated)
    if (email && password && role) {
        // Store role in localStorage to manage access control
        localStorage.setItem('userRole', role);
        
        // Redirect to the main page
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all fields.');
    }
});