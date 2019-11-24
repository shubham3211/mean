let mongoose = require('mongoose');
let User = require('./user');
let Restaurant = require('./restaurant');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

mongoose.connect('mongodb://shubham:shubham123@ds018168.mlab.com:18168/nn-outh-test')
.then(() => {
  console.log('connected to database');
  connect();
})
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

connect = () => {
  app.listen(5000, () => {
  console.log('Listening on port 5000');
})
}

app.post('/addUser', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user = new User({username, password});
  user.save()
    .then(() => {
      res.send({
        status: true,
        message: 'User added successfully'
      })
    })
    .catch((err) =>{
      res.send({
        status: false,
        message: 'Cannot add the user'
      })
    })
  })

  app.post('/user', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.find({ username, password })
      .then((result) => {
        if(result.length>=1){
          res.send({
            status: true,
            message: 'Valid credentials'
          })
        }
        res.send({
          status: false,
          message: "Wrong credientials"
        })
      })
  })

  app.get('/cusine', (req, res) => {
    let arr = [];
    Restaurant.find({})
      .then((result) => {
        result.forEach((ele) => {
          ele.cusine.forEach((resta) => {
            if(arr.indexOf(resta) == -1){
              arr.push(resta);
            }
          })
        })
        res.send({
          status: true,
          result: arr,
          message: 'Cusine found'
        })
      })
      .catch((err) => {
        res.send({
          status: false,
          message: 'Cusine not found'
        })
      })
  })

  app.get('/cusine/:name', (req, res) => {
    Restaurant.find({cusine: req.params.name})
      .then((result) => {
        res.send({
          status: true,
          message: 'Cusine found',
          result
        })
      })
      .catch((err) => {
        res.send({
          status: false,
          message: 'Cusine not found'
        })
      })
  })