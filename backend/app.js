const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST']
}));

app.use(express.json());

const geminiRoutes = require('./routes/gemini');
const youtubeRoutes = require('./routes/youtube');


app.use('/api',geminiRoutes);
app.use('/api', youtubeRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then(() =>console.log("MongoDB Connected"))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server running on port ${PORT}`));
