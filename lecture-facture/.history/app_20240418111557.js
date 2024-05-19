const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3046;

app.use(cors());
app.use(bodyParser.raw({ limit: '10mb', type: '*/*' }));

// Import routes
const caasRoutes = require('./routes/caasRoutes');
const extractedDataRoutes = require('./routes/extractedDataRoutes');

// Use routes
app.use('/caas', caasRoutes);
app.use('/extractedData', extractedDataRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});