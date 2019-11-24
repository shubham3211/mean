import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register:FormGroup;
  constructor(private employeeSer: EmployeeService) { }
  message:String = ''
  ngOnInit() {
    this.register = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit(){
    this.message = 'Adding User ....'
    this.employeeSer.addUser(this.register.value.username, this.register.value.password)
      .subscribe((response:{status:Boolean, message:String}) => {
        this.message = response.message;
      }, (err) => {
        this.message = err;
      })
  }
}
