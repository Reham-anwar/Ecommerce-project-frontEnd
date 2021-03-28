import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
 

  constructor(private httpClient:HttpClient) { }
  private baseUrl='http://localhost:3000/api/order';
 async makeAnOrder(cartId:any){
    return await this.httpClient.get(this.baseUrl+'/placeOrder/'+cartId);
  }
  async getAllOrder(){
    return await this.httpClient.get(this.baseUrl+'/',{observe:'response'});
  }
  async editOrder(orderId:any,status:any){
    const body = {
      status:status
    }
    return await this.httpClient.patch(this.baseUrl+'/adminedit/'+orderId,body,{observe:'response'});
  }
  async getUserOrder(){
    return await this.httpClient.get(this.baseUrl+'/userOrder',{observe:'response'});
  }
  async deleteUserOrder(orderId:any){
    return await this.httpClient.delete(this.baseUrl+'/delete/'+orderId);
  }


}
