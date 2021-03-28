import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { promises } from 'node:fs';
import * as $ from "jquery";
import { CartServiceService } from 'services/cart-service.service';
import{ProductsServiceService} from 'services/products-service.service';
import {OrderServiceService} from 'services/order-service.service'
library.add(faCartPlus);
var array1 :Array<object>;
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})

export class CartPageComponent implements OnInit {
res:any;
carts:any;
productCarts:any;
faCartPlus = faCartPlus;
datapro:any[];
orders:any;
  constructor( private activateRoute:ActivatedRoute,
    
    private route:Router,public CartService:CartServiceService,private productService:ProductsServiceService,public orderService:OrderServiceService) { 
   
      
      
 
      
    }
    async inClickPlus(productId:any){
     (await this.CartService.AddNewCart(productId))
        .subscribe((data) => {
          console.log(data);
          this.ngOnInit();
          // location.reload();
          // $("#divToReload").load(location.href + " #divToReload");
        })
      
    }
    onSelectedMinus(productId:any){
      this.CartService.productMinus(productId)
      .subscribe( (data)=>{
        console.log(data);
        console.log("hi")
        this.ngOnInit();
      })
    }



  async ngOnInit(): Promise<void> {
    (await this.CartService.getCart()).subscribe((data)=>{
      this.res = data;
      this.carts = this.res.body;
      // console.log(this.carts[0].items[0].productImage)
  console.log(this.carts)
  //     console.log(this.carts._id);
    })

  }
 async placeOrder(){
    (await this.orderService.makeAnOrder(this.carts[0]._id)).subscribe((data)=>{
      this.res = data;
      this.orders = this.res.body;
      console.log(this.orders);
      alert("Order placed successfully");
      
      // location.reload();
    })
  }
}
