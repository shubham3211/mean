import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http:HttpClient) { }
  baseUrl = 'http://localhost:5000'
  public verifyUser(username, password){
    return this.http.post(this.baseUrl + '/user', {username, password});
  }

  public addUser(username, password){
    return this.http.post(this.baseUrl + '/addUser', {username, password})
  }

  public getCusine(){
    return this.http.get(this.baseUrl + '/cusine');
  }

  public getCusineByName(name){
    return this.http.get(this.baseUrl + '/cusine' + '/' + name);
  }
}
