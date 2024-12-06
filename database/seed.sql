-- Insert sample customers
INSERT INTO Customer (firstName, lastName, dob, email, phone, address)
VALUES ('John', 'Doe', '1985-02-20', 'john.doe@example.com', '555-1234', '123 Elm St');

-- Insert sample policies
INSERT INTO Policy (policyName, policyType, coverageAmount, premium, description)
VALUES ('Health Plan A', 'Health', 100000, 500, 'Basic health insurance plan.');

-- Insert sample agents
INSERT INTO Agent (firstName, lastName, email, phone)
VALUES ('Jane', 'Smith', 'jane.smith@example.com', '555-5678');