const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors'); 

// DATABASE setup via KNEX
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

// REQUEST FUNCTIONS
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const getProfile = require('./controllers/getProfile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
 
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/getProfile/:userid', (req, res) => {getProfile.getProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});


app.listen(3001, ()=> {
  console.log('app is running on port 3001');
});
