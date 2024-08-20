const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const shopifyCustomersRouter = require('./routes/shopifyCustomers');
const shopifyOrdersRouter = require('./routes/shopifyOrders');
const shopifyProductsRouter = require('./routes/shopifyProducts');
const clvCohortsRouter = require('./routes/clvCohorts');
const repeatCustomers = require('./routes/repeatCustomers');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the routes
app.use('/customers', shopifyCustomersRouter);
app.use('/orders', shopifyOrdersRouter);
app.use('/products', shopifyProductsRouter);
app.use('/clv', clvCohortsRouter);
app.use('/repeat', repeatCustomers);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true // Uncomment if using an older version of Mongoose
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
