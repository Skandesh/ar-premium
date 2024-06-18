const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profilesRouter = require('./routes/profiles');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//DB Connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Database connected');
});

//Routes

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/profiles', profilesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
