-- Customer Table
CREATE TABLE Customer (
    customerId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    dob DATE,
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255)
);
-- Policy Table
CREATE TABLE Policy (
    policyId INTEGER PRIMARY KEY AUTOINCREMENT,
    policyName VARCHAR(100),
    policyType VARCHAR(50),
    coverageAmount DECIMAL(10, 2),
    premium DECIMAL(10, 2),
    description TEXT
);
-- Agent Table
CREATE TABLE Agent (
    agentId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20)
);
-- Customer-Policy Table (Link Table)
CREATE TABLE CustomerPolicy (
    customerPolicyId INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER,
    policyId INTEGER,
    startDate DATE,
    endDate DATE,
    status VARCHAR(50),
    FOREIGN KEY (customerId) REFERENCES Customer(customerId),
    FOREIGN KEY (policyId) REFERENCES Policy(policyId)
);
-- Customer-Agent Table
CREATE TABLE CustomerAgent (
    customerAgentId INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER,
    agentId INTEGER,
    FOREIGN KEY (customerId) REFERENCES Customer(customerId),
    FOREIGN KEY (agentId) REFERENCES Agent(agentId)
);