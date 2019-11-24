let express = require('express');
let mongodb = require('mongodb');
let app = express();
let faker = require('faker');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
})
let dbUrl = 'mongodb://shubham:shubham123@ds018168.mlab.com:18168/nn-outh-test';
let mongoClient = mongodb.MongoClient;

app.get('/users', (req, res) => {
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'cannot connect to database'
      })
    }
    let db = client.db();
    db.collection("users").find({}).toArray((err, result) => {
      if(err){
        res.send({
          status: false,
          message: 'Eror occured'
        })
      }
      res.send({
        status: true,
        result
      })
    })
  })
})

app.post('/addUser', (req, res) => {
  console.log("here");
  let username = req.body.username;
  let password = req.body.password;
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot connect to database'
      })
    }
    let db = client.db();
    db.collection("users").insertOne({ username, password }, (err) => {
      if(err){
        res.send({
          status: false,
          message: 'Error recoed not inserted'
        })
      }
      res.send({
        status: true,
        message: 'User added succesfully'
      })
    })
  })
})

app.post('/user', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot connect to databas '
      })
    }
    let db = client.db();
    db.collection("users").find({ username, password }).toArray((err, result) => {
      //check on empty ayyar and on error occured
      if(err){
        res.send({
          status: false,
          message: 'Error occured'
        })
      }
      if(result.length>=1){
        res.send({
          status: true,
          message: 'user found'
        })
      }else{
        res.send({
          status: false,
          message: 'user not found'
        })
      }
    }) 
  })
})

app.post('/restaurant', (req, res) => {
  let restaurantName = req.body.name;
  let cusine = req.body.cusine;
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot connect to database'
      })
    }
    let db = client.db();
    db.collection("restaurants").insertOne({ restaurantName, cusine }, (err) => {
      if(err){
        res.send({
          status: false,
          message: 'Cannot Insert the user'
        })
      }
      res.send({
        status: true,
        message: 'User Inserted successfully'
      })
    })
  })
})

app.get('/cusine', (req, res) => {
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot connect to database'
      })
    }
    let db = client.db();
    db.collection("restaurants").distinct("cusine",(err, result) => {
      if(err){
        res.send({
          status: false,
          message: 'Couldnot query the database'
        })
      }
      res.send({
        status: true,
        message: 'Cusine found',
        result
      })
    })
  })
})

app.get('/cusine/:name', (req, res) => {
  console.log(req.params.name);
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        messsage: "Cannot connect to the database"
      })
    }
    let db = client.db();
    db.collection("restaurants").find({cusine: req.params.name}).toArray((err, result) => {
      if(err){
        res.send({
          status: false,
          message: 'Not able to find data'
        })
      }
      res.send({
        status: true,
        message: 'Restaurants found',
        result
      })
    })
  })
})

app.listen(5000, () => {
  console.log('Listening on port 5000');
})