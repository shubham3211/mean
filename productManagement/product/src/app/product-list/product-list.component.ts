import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [];
  message:String = '';
  constructor(private productSer: ProductService, private router:Router) { }

  ngOnInit() {
    this.message = 'Loading'
    this.productSer.getProducts()
      .subscribe((response: {status: Boolean, message: String, products: []}) => {
        this.products = response.products;
        this.message = response.message;
        console.log(this.products);
      }, (err) => {
        this.message = err;
      })
  }

  deleteIt(_id){
    this.message = "Deleting..."
    this.productSer.deleteProduct(_id)
      .subscribe((response: {status: Boolean, message: String}) => {
        this.message = response.message
        this.productSer.getProducts()
          .subscribe((response: {status: Boolean, message: String, products: []}) => {
            this.products = response.products;
            this.message = response.message;
          })
      }, (err) => {
        this.message = err;
      })
  }

  storeProduct(product: {pid:Number, pname: String, pprice: Number, _id:any}){
    this.productSer.setProduct(product.pid, product.pname, product.pprice);
    this.router.navigate(['/product-edit', product._id])
  }
}
