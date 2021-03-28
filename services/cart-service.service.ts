import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private httpClient:HttpClient) { }
  private baseUrl='http://localhost:3000/api/cart';

 async getCart(){
    return  await this.httpClient.get(this.baseUrl+'/',{observe:'response'});
   }
   EditCart(cart:any,_id:any){
     
     return this.httpClient.patch(this.baseUrl+'/'+ _id,cart);
   }
  async AddNewCart(userId:any){
    
     return await this.httpClient.get(this.baseUrl+'/add-to-cart/'+userId);
   }
   productMinus(userId:any){
    return this.httpClient.get(this.baseUrl+'/reduce/'+userId);
   }
   deleteCart(_id:any){
     return this.httpClient.delete(this.baseUrl+'/delete/'+_id);
   }
}
