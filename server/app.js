const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerRoutes = require('./routes/customers');
const policyRoutes = require('./routes/policies');
const agentRoutes = require('./routes/agents');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Define routes
app.use('/api/customers', customerRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/agents', agentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});