import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any;
  name: String;
  product_id:String;
  img: String;
  price: String;
  added: boolean;

  constructor(private authService: AuthService,
    private router: Router, private flashMessage: FlashMessagesService) {
     }


  ngOnInit() {
    this.authService.getProducts().subscribe(data => {
      this.products = data;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onEditProduct(product: any) {
    this.authService.storeProductData(product);
    this.router.navigate(['editproduct']);
  }

  onDeleteProduct(product: any) {
    this.authService.deleteProduct(product._id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Product deleted.',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/products']);
      } else {
        this.router.navigate(['/products']);

      }
    });
  }

  onAddProductToCart(product){
    const item = {
      name: product.name,
      product_id: product._id,
      img: product.img,
      price: product.price,
      added: true,
      quantity:1
    }
    this.authService.storeItemToOrder(item);
  }

}
