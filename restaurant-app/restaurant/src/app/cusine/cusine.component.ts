import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cusine',
  templateUrl: './cusine.component.html',
  styleUrls: ['./cusine.component.css']
})
export class CusineComponent implements OnInit {

  constructor(private employeeSer:EmployeeService, private router:Router) { }

  cusines = []
  message:String=""

  ngOnInit() {
    this.message = 'Loading Cusine'
    this.employeeSer.getCusine()
      .subscribe((response:{status: Boolean, message: String, result: []}) => {
        if(response.status){
          this.cusines = response.result;
          this.message = response.message;
        }else{
          this.message = response.message;
        }
      }, (err) => {
        this.message = err;
      })
  }

  showRestaurants(cusineName){
    this.router.navigate(['/restaurant', cusineName]);
  }
}
