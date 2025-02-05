import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
 items:any;
  quantity:number=1;
  subtotal:number;
  totalitems:number;
  total:number;
  constructor(private authService: AuthService,
    private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.items =this.authService.getOrderFromItems();
    if(this.items==null){
      this.flashMessage.show('Please add some items to Cart', { cssClass: 'alert-danger', timeout: 2000 });
      this.subtotal=0;
      this.total=0;
      this.totalitems=0;
    }
    else{      
      let sum = a => a.reduce((x, y) => x + y);  
      let priceInteger: number =0;
      if(this.items){
        priceInteger = sum(this.items.map(x => Number(x.price)));      
      }       
      
      this.totalitems=this.items.length;
      this.subtotal= priceInteger;      
      this.total=this.subtotal;
    }
      
  }
  removeProduct(i){
    if (i > -1) {
      this.items.splice(i, 1);
    }
    let sum = a => a.reduce((x, y) => x + y);  
      let priceInteger2: number =0;
      if(this.items){
        priceInteger2 = sum(this.items.map(x => Number(x.price)));      
      }
    this.totalitems = this.items.length;
    this.subtotal =  priceInteger2;
    this.total = this.subtotal;
    this.authService.updateItemsInOrder(this.items);
    this.router.navigate(['/cart']);
  }
 
  itemslenth(){
    if(this.items.length ==null|| this.items.length == 0){
      return false; 
    }
    else
    return true;
  }
  checkout(){
    if (this.items.length == null || this.items.length == 0){
     
      this.flashMessage.show('Please add some items to Cart', { cssClass: 'alert-danger', timeout: 3000 });
    }
    else{
      
      this.authService.storeTotal(this.total);
       this.router.navigate(['/checkout']);
    }

  }

  

}
