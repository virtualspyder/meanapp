import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  product: any;
  oldproduct: any;
  olduser: any;
  role: any;
  iteml: any;
  totall: any;

  constructor(private http: Http) { }
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
      .map(res => res.json());
  };

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }
  
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
      .map(res => res.json());
  }

  getProducts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/product', { headers: headers })
      .map(res => res.json());
  }

  getUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/user', { headers: headers })
      .map(res => res.json());
  }

  addProduct(product) {
    let headers = new Headers();
    this.loadToken();
    console.log(product);
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/addproduct', product, { headers: headers })
      .map(res => res.json());
  }

  editProduct(product) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/editproduct', product, { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    this.authToken = token;
    this.user = user;
    this.role = user.role;
  }

  storeProductData(product: any) {
    this.oldproduct = product;
  }

  storeUser(user: any) {
    this.olduser = user;
  }

  storeItemToOrder(item: any) {
    var tempItem = JSON.parse(localStorage.getItem("items"));
    if (tempItem == null) tempItem = [];
    localStorage.setItem("item", JSON.stringify(item));
    tempItem.push(item);
    localStorage.setItem("items", JSON.stringify(tempItem));
  }

  updateItemsInOrder(items: any) {
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));
  }
  
  getOrderFromItems() {
    console.log(localStorage.getItem("items"));
    return this.iteml = JSON.parse(localStorage.getItem("items"));
  }

  orderClear() {
    localStorage.removeItem("items");
    localStorage.removeItem("item");
  }

  getProductData() {
    return this.oldproduct;
  }

  getUserData() {
    return this.olduser;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  getUser() {
    return this.user;
  }

  deleteProduct(productID) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/users/deleteproduct/' + productID, { headers: headers })
      .map(res => res.json());
  }

  deleteUser(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/users/deleteuser/' + user, { headers: headers })
      .map(res => res.json());
  }

  editUser(user) {
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/edituser', user, { headers: headers })
      .map(res => res.json());
  }

  getOrder() {
    return this.iteml = JSON.parse(localStorage.getItem("items"));;
  }
  
  storeTotal(total: any) {
    this.totall = total;
  }

  getTotal() {
    return this.totall;
  }

  itemslenth() {
    var tempItem = JSON.parse(localStorage.getItem("items"));
    if(tempItem){
      if (tempItem.length > 0) {
        return true;
      }
      else{
        return false;
      }
    }    
      
  }

  userRole() {
   if(this.user){
      if (this.user.username == 'admin')
        return true;
      else
        return false;
    }
   }        

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
