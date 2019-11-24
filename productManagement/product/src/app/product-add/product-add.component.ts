import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import  faker from 'faker'

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productSer: ProductService, private router:Router) { }

  productAdd:FormGroup;
  message:String = '';

  ngOnInit() {
    this.productAdd = new FormGroup({
      pname: new FormControl(faker.commerce.product()),
      pid: new FormControl(faker.random.number()),
      pprice: new FormControl(faker.random.number())
    })
  }

  onSubmit() {
    this.message = 'Adding Product....'
    this.productSer.addProduct(this.productAdd.value)
      .subscribe((response:{status: Boolean, message: String}) => {
        this.message = response.message;
        setTimeout(() => {
          this.router.navigate(['product-list'])
        }, 2000)
      }, (err) => {
        this.message = err;
      })
  }
}
