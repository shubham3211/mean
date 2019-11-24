let mongodb = require('mongodb');
let mongoClient = mongodb.MongoClient;
let dbUrl = 'mongodb://shubham:shubham123@ds018168.mlab.com:18168/nn-outh-test';
let express = require('express');
let app = express();
let ObjectId = mongodb.ObjectId;
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
  next();
})
// mongoClient.connect(dbUrl, function(err, client){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Connected to server");
//     const db = client.db();
//     db.collection("users").insertOne({
//       name: "Shubham"
//     });
//     client.close();
//   }
// })

app.get('/products', (req, res) => {
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'cannot connect to database'
      })
    }
    let db = client.db();
    db.collection("products").find({ $nor: [ {pname: /^A/}, {pname: /a$/} ] })
                            .sort({pname: 1})
                            .toArray((err, products) => {
      if(err){
        res.send({
          status:false,
          message: 'error occured'
        })
      }
      res.json({
        status: true,
        message: 'Success',
        products
      })
    })
    client.close();
  })
})

app.get('/product/id/:_id', (req, res) => {
  if(!req.params._id){
    res.send({
      status: false,
      message: 'Please Provide a id'
    })
  }

  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot conenct to database'
      })
    }
    let db = client.db();
    console.log(req.params._id);
    db.collection('products').find({ _id: ObjectId(req.params._id) }).toArray((err, product) => {
      if(err){
        res.send({
          status: false,
          message: 'Cannot find product with the given id'
        })
      }
      res.send({
        status: true,
        message: 'product found',
        product
      })
      client.close();
    })
  })
})

app.put('/update-product/id', (req, res) => {
  console.log(req.body._id);
  if(!req.body._id){
    res.send({
      status: false,
      message: 'Please provide a id'
    })
  }
  let update = {};
  if(req.body.pid){
    update.pid = req.body.pid;
  }
  if(req.body.pname){
    update.pname = req.body.pname;
  }
  if(req.body.pprice){
    update.pprice = req.body.pprice;
  }
  mongoClient.connect(dbUrl ,(err, client) => {
    let db = client.db();
    if(err){
      res.send({
        status: false,
        message: 'Cannot connect to database',
        error: err
      })
    }
    db.collection("products").updateOne({ _id: ObjectId(req.body._id) }, {$set: update}, (err) => {
        
      if(err){
          res.send({
            ststus: false,
            message: 'Cannot update the product',
            error: err
          })
        }
        res.send({
          status: true,
          message: 'product updated'
        })
      })
      client.close();
  })
})

app.put('/update-product', (req, res) => {
  let {pid, pname, pprice} = req.body.search, search = {}, update = {};
  if(!pid && !pname && !pprice){
    res.send({
      status: false,
      message: 'Please send thhe parameters'
    })
  }
  if(pid){
    search.pid = pid;
  }
  if(pname){
    search.pname = pname;
  }
  if(pprice){
    search.pprice = pprice;
  }
  if(req.body.pid){
    update.pid = req.body.pid;
  }
  if(req.body.pname){
    update.pname = req.body.pname;
  }
  if(req.body.pprice){
    update.pprice = req.body.pprice;
  }
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot connect to the database'
      })
    }
    let db = client.db();
    db.collection("products").updateOne(search, { $set: update }, (err) => {
      if(err){
        res.send({
          status: false,
          message: 'Cannot update the product'
        })
      }
      res.send({
        status: true,
        message: 'Product updated successfully'
      })
      client.close();
    })
  })
})

// app.put('/update-products-ids', (req, res) => {
//   if(req.body.ids.length == 0){
//     res.send({
//       status: false,
//       message: 'Please provide an array of ids'
//     })
//   }
//   let {pid, pname, pprice} = req.body, update = {};
//   if(pid){
//     update.pid = pid;
//   }
//   if(pname){
//     update.pname = pname;
//   }
//   if(pprice){
//     update.pprice = pprice;
//   }
//   console.log(update);
//   mongoClient.connect(dbUrl, (err, client) => {
//     if(err){
//       res.send({
//         status: false,
//         message: 'Cannot conect to the database'
//       })
//     }
//     let db = client.db();
//     for(let i=0;i<req.body.ids.length;i++){
//       req.body.ids[i] = ObjectId(req.body.ids[i]);
//     }
//     db.collection("products").updateOne({ _id: { $in: req.body.ids } }, { 
//                                           $set: { name: 'vicky' },
//                                           $mul: { pprice: 200 },
//                                           // $rename: { pname: "name" },
//                                           // $push: {
//                                           //   shops: {
//                                           //     $each: [
//                                           //       {name: "shubham"},
//                                           //       {name: "vikran"},
//                                           //       {name: "mohit"}
//                                           //     ]
//                                           //   }
//                                           // }
//                                         }, (err) => {
//       if(err){
//         res.send({
//           status: false,
//           message: 'Cannot update the product'
//         })
//       }
//       res.send({
//         status: true,
//         message: 'Product Updated'
//       })
//     })
//   })
// })

app.post('/add-product', (req, res) => {
  let { pid, pname, pprice } = req.body;
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot connect to the server'
      })
    }
    let db = client.db();
    db.collection("products").insertOne({pid, pname, pprice}, (err, result) =>{
      if(err){
        res.send({
          status: false,
          message: 'cannot insert the product'
        })
      }
      res.send({
        status: true,
        message: 'Porduct inserted successfully',
        result
      })
    })
  })
})

app.post('/add-products', (req, res) => {
  let arr = [];
  let { pid, pname, pprice } = req.body;
  for(let i=0;i<10;i++){
    arr.push({pid, pname, pprice});
  }
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot connect to the server'
      })
    }
    console.log(arr);
    let db = client.db();
    db.collection("products").insertMany(arr, (err, result) =>{
      if(err){
        res.send({
          status: false,
          message: 'cannot insert the product'
        })
      }
      res.send({
        status: true,
        message: 'Porduct inserted successfully',
        result
      })
    })
    client.close();
  })
})

app.post('/del/', (req, res) => {
  if(!req.body._id){
    res.send({
      status: false,
      message: 'Please send id in body'
    })
  } 
  mongoClient.connect(dbUrl, (err, client) => {
    if(err){
      res.send({
        status: false,
        message: 'Cannot connet to the database'
      })
    }
    let db = client.db();
    db.collection("products").deleteOne({ _id: ObjectId(req.body._id) }, (err) => {
      if(err){
        res.send({
          status: false,
          message: 'cannot delete the product'
        })
      }
      res.send({
        status: true,
        message: 'product deleted successfullu'
      })
    })
  })
})

app.listen(5000, () => {
  console.log("listening on port 5000");
})