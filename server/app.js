const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const router = require('./config/database');

mongoose.connect(router.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database ');
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();
const users = require('./routes/users');
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*',(req,res)=>{
 res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port, () => {
  console.log('Server started on port '+port);
});
