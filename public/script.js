// Base API URL
const API_BASE = '/api';

// Utility function to render a list
function renderList(items, listElement) {
    listElement.innerHTML = items.map(item => `<li>${Object.values(item).join(' - ')}</li>`).join('');
}

// Load Customers
async function loadCustomers() {
    const response = await fetch(`${API_BASE}/customers`);
    const customers = await response.json();
    const customerList = document.getElementById('customerList');
    renderList(customers, customerList);
}

// Load Policies
async function loadPolicies() {
    const response = await fetch(`${API_BASE}/policies`);
    const policies = await response.json();
    const policyList = document.getElementById('policyList');
    renderList(policies, policyList);
}

// Show actions based on user role
function checkRole() {
    const role = localStorage.getItem('userRole');

    if (role === 'agent') {
        document.getElementById('agentActions').style.display = 'block';
    }
}

// Add Policy (for Agents)
document.getElementById('addPolicyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const policy = {
        policyName: document.getElementById('policyName').value,
        policyType: document.getElementById('policyType').value,
        coverageAmount: parseFloat(document.getElementById('policyCoverageAmount').value),
        premium: parseFloat(document.getElementById('policyPremium').value),
        description: document.getElementById('policyDescription').value,
    };

    const response = await fetch(`${API_BASE}/policies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policy),
    });

    if (response.ok) {
        alert('Policy added successfully!');
        loadPolicies(); // Reload the policies list
    }
});

// Add Customer (for Agents)
document.getElementById('addCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const customer = {
        firstName: document.getElementById('customerFirstName').value,
        lastName: document.getElementById('customerLastName').value,
        dob: document.getElementById('customerDob').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
    };

    const response = await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });

    if (response.ok) {
        alert('Customer added successfully!');
        loadCustomers(); // Reload the customer list
    }
});

// Load and render data
loadCustomers();
loadPolicies();
checkRole();

// Logout function
function logout() {
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}