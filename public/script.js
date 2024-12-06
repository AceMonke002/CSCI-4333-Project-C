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

// Add Customer
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
        loadCustomers();
    }
});

// Load Policies
async function loadPolicies() {
    const response = await fetch(`${API_BASE}/policies`);
    const policies = await response.json();
    const policyList = document.getElementById('policyList');
    renderList(policies, policyList);
}

// Add Policy
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
        loadPolicies();
    }
});

// Load Agents
async function loadAgents() {
    const response = await fetch(`${API_BASE}/agents`);
    const agents = await response.json();
    const agentList = document.getElementById('agentList');
    renderList(agents, agentList);
}

// Add Agent
document.getElementById('addAgentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const agent = {
        firstName: document.getElementById('agentFirstName').value,
        lastName: document.getElementById('agentLastName').value,
        email: document.getElementById('agentEmail').value,
        phone: document.getElementById('agentPhone').value,
    };

    const response = await fetch(`${API_BASE}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
    });

    if (response.ok) {
        alert('Agent added successfully!');
        loadAgents();
    }
});

// Load all data on page load
loadCustomers();
loadPolicies();
loadAgents();