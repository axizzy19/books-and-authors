const express = require('express');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');
const authorRoutes = require('./routes/author.routes');
const bookRoutes = require('./routes/book.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        error: 'Route not found' 
    });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})