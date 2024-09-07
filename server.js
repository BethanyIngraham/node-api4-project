const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

const users = [
    {id: 1, name: 'Matthew', password: '123'},
    {id: 2, name: 'John', password: '456'},
    {id: 3, name: 'Thomas', password: '789'}
];

server.get('/api/users', (req, res) => {
 res.status(200).json(users);
});

server.post('/api/register', (req, res) => {
   const {name, password} = req.body;
   if(
    typeof name === 'string' 
    && name.length 
    && name.trim()
    && typeof password === 'string'
    && password.length 
    && password.trim()
) {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = {id: newId, name: name, password: password};
    users.push(newUser);
    res.status(201).json({
        message: 'New user created',
        user: newUser
    });
} else {
    res.status(400).json({
        message: 'Please provide name and password'
    });
}
});

server.post('/api/login',(req, res) => {
  const {name, password} = req.body;
  const user = users.find(user => 
    user.name === name &&
    user.password === password
  );
  if(!name || !password) {
    res.status(400).json({
        message: 'Please provide name and password'
    });
  } else if(user) {
    res.status(200).json({
        message: `Welcome, ${name}!`
    });
  } else {
    res.status(404).json({
        message: 'Sorry, you are not registered yet'
    });
  }
});

module.exports = server;