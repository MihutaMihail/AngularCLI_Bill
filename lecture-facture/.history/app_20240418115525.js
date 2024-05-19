const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Import your Swagger documentation JSON file

const app = express();
const port = 3048;

app.use(cors());
app.use(bodyParser.raw({ limit: '10mb', type: '*/*' }));
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Import routes
const caasRoutes = require('./routes/caasRoutes');
const extractedDataRoutes = require('./routes/extractedDataRoutes');

// Use routes
app.use('/caas', caasRoutes);
app.use('/extractedData', extractedDataRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
