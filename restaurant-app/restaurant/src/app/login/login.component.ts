import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  message:String = ''
  constructor(private employeeSer:EmployeeService, private router:Router) { }

  ngOnInit() {
    this.login = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit(){
    this.message = 'Verifying'
    this.employeeSer.verifyUser(this.login.value.username, this.login.value.password)
      .subscribe((response: {status:Boolean, message:String}) =>{
        if(response.status){
          this.message = 'Login Successful'
          this.router.navigate(['cusine'])
        }else{
          this.message = 'Incorrect username/password'
        }
      }, (err) => {
        this.message = err
      })
  }
}
