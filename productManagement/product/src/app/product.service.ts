import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private pid;
  private pname;
  private pprice;
  constructor(private http: HttpClient) { 
    this.pid = 0;
    this.pname = '';
    this.pprice = 0;
  }
  baseUrl = 'http://localhost:5000'

  public setProduct(pid, pname, pprice){
    this.pid = pid;
    this.pname = pname;
    this.pprice = pprice;
  }

  public getProduct(){
    return { pid: this.pid, pname: this.pname, pprice: this.pprice }
  }

  public getProducts(){
    return this.http.get(this.baseUrl + '/products')
  }

  public addProduct(productObj){
    return this.http.post(this.baseUrl + '/add-product', productObj)
  }

  public editProduct(updatedProductObj){
    return this.http.put(this.baseUrl + '/update-product/id', updatedProductObj)
  }

  public deleteProduct(_id){
    return this.http.post(this.baseUrl + '/del/', {_id})
  }
}
