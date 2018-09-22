const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const { generateToken } = require('./middlewares');
const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            
            db('users')
                .where({ id })
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json({ id: user.id, token });
                })
                .catch(err => {
                    console.log('/api/register POST error:', err);
                    res.status(500).send('Please try again later.');
                });
        })
        .catch(err => {
            console.log('/api/register POST error:', err);
            res.status(500).send('Please try again later.');
        });        
}

function login(req, res) {
  // implement user login
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password )) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        })
        .catch(err => {
            console.log('/api/login POST error:', err);
            res.status(500).send('Please try again later.');
        });
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
