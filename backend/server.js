const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log('Server running')))
  .catch(err => console.error(err));
