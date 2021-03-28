import { Component, OnInit } from '@angular/core';
import {OrderServiceService} from 'services/order-service.service'
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
res:any;
allOrders:any;
  constructor(private orderService:OrderServiceService) { }

 async ngOnInit(){
    (await this.orderService.getAllOrder()).subscribe((data)=>{
      this.res=data;
      this.allOrders = this.res.body;
      console.log(this.allOrders);
  

    })

  }
 async editStatus(orderId:any,state:any){
          (await this.orderService.editOrder(orderId,state)).subscribe(()=>{
            console.log("success");
            alert("state updated successfully");
          },(err)=>{
            console.log(err);
          })
  }

}
