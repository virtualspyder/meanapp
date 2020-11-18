import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  firstName: String;  
  email: String;
  Address: String;  
  type: String;  
  ccnumber: String;  
  constructor(private flashMessage: FlashMessagesService, private authService: AuthService,
    private router: Router, private validateService: ValidateService) { }

  ngOnInit() {
  }

  orderPlaced() {


    const checkout = {
      firstName: this.firstName,      
      email: this.email,
      Address: this.Address,
    }

    const card = {      
      ccnumber: this.ccnumber,
    }

    if (!this.validateService.validateCheckout(checkout)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateCard(card)) {
      this.flashMessage.show('Please fill all the card details', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    this.flashMessage.show('Your order is Placed', { cssClass: 'alert-success', timeout: 8000 });
    this.authService.orderClear();
    this.router.navigate(['/']);
  }

  paymentMethod() {
    
  }

}
