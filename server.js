const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    database: 'face-AI',
  },
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
