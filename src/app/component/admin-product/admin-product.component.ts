import { Component, OnInit,EventEmitter,Output ,ViewChild, Input} from '@angular/core';
import {FormControl,FormBuilder, Validators,FormGroup, NgForm} from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartPlus,faEdit ,faTrash} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { model } from 'mongoose';
import { ProductsServiceService } from 'services/products-service.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { title } from 'node:process';

library.add(faCartPlus,faEdit,faTrash);


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
  providers:[ProductsServiceService]
})
export class AdminProductComponent  implements OnInit {
  //icons
  faCartPlus = faCartPlus;
  faEdit = faEdit;
  faTrash=faTrash;
  //variables
  closeResult: string="";      
  products:any;
  res:any;
  productsObj:any;
  selectedFile:any=null;

  constructor(private modalService: NgbModal,public productService:ProductsServiceService,private http:HttpClient) { }

  // ngOnInit():void{
  //   //to get all products in the page
  //   this.productService.getProducts().subscribe(
  //     (data)=>{

  //       this.res=data;
  //       console.log(this.res.body);
  //       this.products=this.res.body;
  //       console.log(this.products);
  //       for (const product in this.products) {
  //        console.log(this.products[product].title)
  //        console.log(this.products[product].price)
  //        console.log(this.products[product].description)
  //        console.log(this.products[product].productImage)
  //        console.log(this.products[product]._id)
  //       }
  //     },
  //     (err)=>{

  //     },
  //   ) 
  // }

msg:any;
search:any;
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
    // this.products=0;
    this.msg=undefined;
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
  //to edit product
    onSubmit(form:NgForm,p:any,_title:string,_description:string,_price:string){
      console.log(p);
      console.log(p._id);
      //console.log(_title)
       //console.log(form);
     const fd={
        title:_title,
        description:_description,
        price:_price
      }

       console.log(fd)
       this.productService.EditProducts(fd, p._id ).subscribe(
              (data)=>{
                console.log(data);
                window.alert('product Edited successfully');
                this.ngOnInit();
              }
            )

    }

  //Add New Product with title ,price, description, imgage
  //function to upload img
  onFileSelected(event:any){
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  //function to add new product
  onSubmitPostProduct(_title:string,_description:string,_price:string,_productImage:string){
    console.log(_title);
    console.log(_description);
    console.log(_price);
    console.log(_productImage)
    
    const fd = new FormData();
    fd.append('title',_title)
    fd.append('description',_description)
    fd.append('price',_price)
    fd.append('productImage',this.selectedFile,this.selectedFile.name);

    this.productService.AddNewProduct(fd).subscribe(
      (data)=>{
        console.log(data);
        window.alert('added successfully');
        this.ngOnInit();
      }
    )
  }

  //function to delete product
  delete_product(p:any){
    if(window.confirm('Are You Sure You Want To Delete Product?')){
      console.log(p);
     console.log(p._id);
      this.productService.deleteProduct(p._id).subscribe(
        (data)=>{
          console.log(data);
           p=undefined;
           window.alert('deleted successfully');
           this.ngOnInit();
        })
    }else {
       p.confirm.reject();
    }
  }


//to open modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onSearch(){
    this.ngOnInit();
  }

}
