const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, './uploads'))); 
app.use(express.static(path.join(__dirname, '../gharpayy.com')));
app.use(express.static(path.join(__dirname, '../adminpages')));


mongoose
  .connect("mongodb+srv://gharpayywebsite:Azad1234@cluster0.ij5yv.mongodb.net/gharpayy?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

const listingRoutes = require('./routes/listingroutes');
app.use('/api/listings', listingRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'gharpayy.com', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../adminpages', 'admin-index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
