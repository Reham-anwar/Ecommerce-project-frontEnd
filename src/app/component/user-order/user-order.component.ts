import { Component, OnInit } from '@angular/core';
import {OrderServiceService} from 'services/order-service.service'
@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
res:any;
orders:any;
count:any;
  constructor(private orderService:OrderServiceService) { }

 async ngOnInit() {
   this.count = 1;
   (await this.orderService.getUserOrder()).subscribe((data)=>{
     this.res = data;
    this.orders = this.res.body;
    console.log(this.orders[0].cart.items[0]._id);
   }) 
  }
 async deleteOrder(orderId:any){
    (await this.orderService.deleteUserOrder(orderId)).subscribe(()=>{

      this.ngOnInit();
    },(err)=>{
      console.log("error ");
    })
  }

}
