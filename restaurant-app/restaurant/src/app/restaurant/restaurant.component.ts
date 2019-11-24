import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(private router:ActivatedRoute, private employeeSer:EmployeeService) { }

  restaurants = [];
  message:String = ''

  ngOnInit() {
    this.message = 'Finding restaurants'
    this.router.params.subscribe((params) => {
      this.employeeSer.getCusineByName(params['cusineName'])
        .subscribe((response:{status:Boolean, message:String, result:[]}) => {
          if(response.status){
            this.restaurants = response.result;
            this.message = response.message;
          }else{
            this.message = response.message;
          }
        }, (err) =>{
          this.message = err;
        })
    })
  }

}
