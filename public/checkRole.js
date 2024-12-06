// Check the role of the user stored in localStorage
function checkRole() {
    const role = localStorage.getItem('userRole');
    
    if (role === 'agent') {
        document.getElementById('agentActions').style.display = 'block'; // Show agent actions
    } else {
        document.getElementById('agentActions').style.display = 'none'; // Hide agent actions
    }
}

// Call the function on page load
checkRole();