-- Users Table
CREATE TABLE users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'agent') NOT NULL
);

-- Customers Table
CREATE TABLE customers (
    customerId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    dob DATE,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    userId INTEGER UNIQUE,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- Agents Table
CREATE TABLE agents (
    agentId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    userId INTEGER UNIQUE,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- Policies Table
CREATE TABLE policies (
    policyId INTEGER PRIMARY KEY AUTOINCREMENT,
    policyName VARCHAR(100) NOT NULL,
    policyType VARCHAR(50) NOT NULL,
    coverageAmount DECIMAL(10, 2),
    premium DECIMAL(10, 2),
    description TEXT
);

-- Customer Policies Table
CREATE TABLE customerPolicies (
    customerPolicyId INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER,
    policyId INTEGER,
    startDate DATE,
    endDate DATE,
    status VARCHAR(50),
    FOREIGN KEY (customerId) REFERENCES customers(customerId),
    FOREIGN KEY (policyId) REFERENCES policies(policyId)
);

-- Claims Table
CREATE TABLE claims (
    claimId INTEGER PRIMARY KEY AUTOINCREMENT,
    customerPolicyId INTEGER,
    claimAmount DECIMAL(10, 2),
    claimDate DATE,
    status VARCHAR(50),
    description TEXT,
    FOREIGN KEY (customerPolicyId) REFERENCES customerPolicies(customerPolicyId)
);

-- Payments Table
CREATE TABLE payments (
    paymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    customerPolicyId INTEGER,
    amount DECIMAL(10, 2),
    paymentDate DATE,
    method VARCHAR(50),
    FOREIGN KEY (customerPolicyId) REFERENCES customerPolicies(customerPolicyId)
);

-- Insert Users
INSERT INTO users (username, password, role) VALUES
('customer1', 'password1', 'customer'),
('agent1', 'password2', 'agent');

-- Insert Policies
INSERT INTO policies (policyName, policyType, coverageAmount, premium, description) VALUES
('Health Basic', 'health', 50000, 200, 'Basic health insurance coverage'),
('Car Insurance', 'auto', 20000, 150, 'Coverage for automobile damages');