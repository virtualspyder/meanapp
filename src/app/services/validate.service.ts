import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }
  validateProduct(product) {
    if (product.name == undefined || product.img == undefined || product.description == undefined || product.price == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateUser(user) {
    if (user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEditProduct(product) {
    if (product.name == undefined || product.img == undefined || product.description == undefined
     || product._id == undefined || product.price == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEditUser(user) {
    if (user.name == undefined || user.username == undefined || user.email == undefined
      || user.password == undefined || user._id == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateCheckout(checkout) {
    if (checkout.firstName == undefined || checkout.email == undefined
      || checkout.Address == undefined ) {
      return false;
    } else {
      return true;
    }
  }

  validateCard(card){
    if ( card.ccnumber  == undefined) {
      return false;
    } else {
      return true;
    }
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
