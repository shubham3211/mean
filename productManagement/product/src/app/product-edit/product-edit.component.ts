import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productEdit:FormGroup;
  message:String = '';
  _id;
  constructor(private productSer:ProductService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    // let { pid, pname, pprice} = this.productSer.getProduct();
    let pid = null, pname = null, pprice = null;
    this.productEdit = new FormGroup({
      pid: new FormControl(pid, [Validators.required, this.checkIntVal]),
      pname: new FormControl(pname, [Validators.required, Validators.maxLength(5)]),
      pprice: new FormControl(pprice, [Validators.required, this.checkLength]),
    })
    this.route.params.subscribe((params) => {
      this._id = params['_id'];
    })
  }

  onSubmit(){
    console.log(this.productEdit);
    if(this.productEdit.valid){
      let { pid, pname, pprice } = this.productEdit.value;
      let _id = this._id;
      console.log(pid, pname, pprice, this._id)
      this.message = 'Updating...'
      this.productSer.editProduct({pid, pname, pprice, _id})
        .subscribe((response: {status:Boolean, message:String}) => {
          this.message = response.message;
          this.router.navigate(['product-list'])
        }, (err) => {
          this.message = err;
        })
    }
  }

  checkIntVal(f:FormControl){
    if(!f.value){
      return null;
    }
    for(let i=0;i<f.value.length;i++){
      if(f.value.charCodeAt(i)<48 || f.value.charCodeAt(i)>57){
        return { 'Invalid Number': true }
      }
    }
    return null;
  }

  checkLength(f: FormControl){
    if(!f.value){
      return null;
    }
    if(f.value.length>5){
      return { 'invalid-length': true }
    }
    return null;
  }
}
