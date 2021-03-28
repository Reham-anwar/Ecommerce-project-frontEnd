import { Component, OnInit } from '@angular/core';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductsServiceService } from 'services/products-service.service';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {CartServiceService} from 'services/cart-service.service'
library.add(faCartPlus);

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  faCartPlus = faCartPlus;
  search:any;
  constructor(private userService: UserService,private productService:ProductsServiceService,private router:Router,private route:ActivatedRoute,private cartService:CartServiceService) { }

  selectdCartId:string | undefined;
products:any;
res:any;
msg:any;
productsObj:any;
filteredItems:any;
productFilter:any;
// assignCopy(){
//   console.log("empty");
//  this.filteredItems = Object.assign([], this.productFilter);
// }
filterItem(value:any){
 if(!value){
   this.msg="item not found";
    //  this.assignCopy();
 } 
return  this.filteredItems = Object.assign([], this.productFilter).filter(
   (item:any) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
 )}
  ngOnInit(): void {
    this.msg=undefined;
    // this.products=0;
  if(this.search!==undefined){
    this.productService.getProducts().subscribe(
      (data)=>{
        this.res = data;
        this.productFilter=this.res.body;
    
        this.products = this.filterItem(this.search);
        console.log(this.products);
        if ((this.products).length === 0) {
          console.log("hhhiii")
          this.msg = "item not found";
        }
     
    })
  }else{    
    this.productService.getProducts().subscribe(
    (data)=>{

      this.res=data;
      console.log(this.res.body);
      this.products=this.res.body;
      for (const product in this.products) {
        console.log(this.products[product]._id)
       console.log(this.products[product].title)
       console.log(this.products[product].price)
       console.log(this.products[product].description)

   //   this.productsObj.push(this.products[product])
      }

    },
    (err)=>{
      console.log("error -_-")
    },
  )}
}
  async onSelectedProduct(id:string){
    if(this.userService.isLoggedIn()){
      console.log("iam here")
    console.log("the id is "+id);
    
    // this.ngOnInit();
    (await this.cartService.AddNewCart(id))
    .subscribe( (data)=>{
      console.log(data);
      window.alert('added successfully');
      this.router.navigate(['/cartPage/'+id]);
    })
    }
    else{
      this.router.navigateByUrl('/login');
    }
    


}

onSearch(){
this.ngOnInit();
}

}
