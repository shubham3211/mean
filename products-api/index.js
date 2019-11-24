let mongoose = require('mongoose');
let Product = require('./models/product');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

mongoose.connect('mongodb://shubham:shubham123@ds018168.mlab.com:18168/nn-outh-test')
  .then(() => {
    console.log('connected to database');
    connect();
  })

app.get('/products', (req, res) => {
  // , { pname: 1, pprice: 1, lastModified: 1}
Product.find({ $nor: [ {pname: /^A/} , { pname: /$a/ }] })
    .sort({pprice: 1})
    .then((products) => {
      res.send({ status: true, message: 'Success', products: products });
    })
    .catch((err) => {
      res.send(err);
    })
})

app.get('/product/id/:_id', (req, res) => {
  Product.findById(req.params._id)
    .then((product) => {
      res.send({
        status: true,
        message: 'Success',
        product: product
      })
    })
    .catch(() => {
      res.send({
        status: false,
        message: 'Failure'
      })
    })
  // Product.find({_id: req.params._id})
  //   .then((products) => {
  //     res.send({
  //       status: true,
  //       message: 'Success',
  //       product: products
  //     })
  //   })
  //   .catch(() => {
  //     res.send({
  //       status: false,
  //       message: 'Failure'
  //     })
  //   })
})

app.put('/update-product/id/:_id', (req, res) => {
  if(req.params._id){
    console.log(typeof(req.params._id));
    console.log(mongoose.Types.ObjectId.isValid(req.params._id));
    let update = {};
    if(req.body.pname){
      update.pname = req.body.pname;
    }
    if(req.body.pid){
      update.pid = req.body.pid;
    }
    if(req.body.pprice){
      update.pprice = req.body.pprice;
    }
    console.log(update);
    Product.findByIdAndUpdate(req.params._id, update)
      .then(() => {
        res.send({
          status: true,
          message: 'Product Updated'
        })
      })
      .catch((err) => {
        res.send({
          status: false,
          message: 'Error occured could not update the product'
        })
      })
  }else{
    res.send({
      status: false,
      message: 'Please send the right parameters'
    })
  }
})

app.put('/update-product', (req, res) => {
  let update = {} , {pname, pprice, pid} = req.body.search, search = {};
  if(!pname && !pid && !pprice){
    res.json({
      status: false,
      message: 'Enter right paraments'
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
  Product.updateMany(search, update)
    .then(() => res.send({status: true, message: 'Product Updated'}))
    .catch(() => res.send({ status: false, message: 'Error occured cannot update the product' }))
})

app.put('/update-product-one', (req, res) => {
  if(!req.body.search){
    res.json({
      status: false,
      message: 'Please enter search parameter'
    })
  }
  let {pid, pname, pprice} = req.body.search, search = {}, update = {};
  if(!pid && !pname && !pprice){
    res.json({
      status: false,
      message: 'Please send required parameters'
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
  Product.updateOne(search, update)
    .then(() => {
      res.send({
        status: true,
        message: 'First Product updated'
      })
    })
    .catch(() => {

    })
})

app.put('/update-products-ids', (req, res) => {
  let ids = req.body.ids;
  if(ids.length == 0){
    res.send({
      status: false,
      message: 'Please send an array of ids'
    })
  }
  Product.updateMany({
                    _id: { $in: ids }}, 
                    { 
                      $mul: { pprice: 2 } ,
                      $currentDate: { lastModified: { $type: "date" } },
                      $set: { pname: "shubham" },
                      // $min: { pid: 5 },
                      // $max: { pid: 10 },
                      $rename: { name: "pname" },
                      // $unset: { pid: "" },
                      // $push: { 
                      //    shops: {
                      //      $each: [
                      //       { name: "Shubham store" },
                      //       { name: "Vijay Store" },
                      //       { name: "Sumit store" }
                      //     ],
                      //     $position: 0
                          // $sort: { name: 1 },
                          // $slice: 3
                      //    } 
                      //  }
                      // $push: {
                      //   shops: {
                      //     $each: ["Shubham", "vijay", "mohit"]
                      //   }
                      // }
                      $pull : {
                        shops: { name: /store$/ }
                      }
                    })
    .then(() => {
      res.send({
        status: true,
        message: 'Products updated'
      })
    })
    .catch((err) => {
      res.send({
        status: false,
        message: 'Error Occured cannot update the product',
        err
      })
    })
})

app.post('/add-product', (req, res) => {
  let product = new Product({ pname: req.body.pname, pid: req.body.pid, pprice: req.body.pprice });
  product
    .save()
    .then(() => res.json({ status: true, message: 'Product added successfully' }))
    .catch((err) => res.json({status: false, message: 'Error occured cannot add product'}))
})

app.delete('/del', (req, res) => {
  Product.deleteMany({})
    .then(() => {
      res.json({
        status: true,
        message: 'Products deleted successfully'
      })
    })
    .catch(() => {
      res.json({
        status: false,
        message: 'Error occured cannot delete all of the products'
      })
    })
})

//Todo array of ids given update all of them

app.delete('/del/id/:_id', (req, res) => {
  let _id = req.params._id;
  if(!_id){
    res.json({
      status: false,
      message: 'Please enter the id in the params'
    })
  }
  Product.findByIdAndDelete(_id)
    .then(() => {
      res.json({
        status: true,
        message: 'Product Deleted Successfully'
      })
    })
    .catch(() => {
      res.send({
        status: false,
        message: 'Some error occured cannot delete the record'
      })
    })
})

app.delete('/del/price/:price', (req, res) => {
  let price = req.params.price;
  if(price == undefined){
    res.json({
      status: false,
      message: 'Please entre the price'
    })
  }
  Product.deleteMany({ pprice: { $gt: price } })
    .then(() => {
      res.send({
        status: true,
        message: 'Product successfully deleted'
      })
    })
    .catch(() => {
      res.send({
        status: false,
        message: 'Error occured cannot delete the product'
      })
    })
})

let connect = () => {
  app.listen(5000, () => console.log("Appp listening on port  5000"));
}