import { ToastrService } from 'ngx-toastr';
import { AppConstants } from './../models/AppConstants';
import { FurnitureCartDTO } from './../models/furniture-cart-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable, Output, EventEmitter } from '@angular/core';
import { FurnitureCart } from "src/app/shared/models/furniture-cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,private toaster:ToastrService) {
    this.cartFurniture=new FurnitureCartDTO();
    this.cartFurnitureIncrease=new FurnitureCartDTO();
    this.cart=new Array<any>();
    this.message=null;
  }
  cart=[];
  cartFurniture:FurnitureCartDTO
  cartFurnitureIncrease:FurnitureCartDTO;
  email:String;
  @Output() cartSize:EventEmitter<number>= new EventEmitter();
  @Output() message:EventEmitter<String>=new EventEmitter();
  messageInf:Observable<String>;
  message1:String;
    sendNumber(number:number,check:boolean):Observable<any>{
      const index=this.cart.indexOf(number);
      console.log(number);
      console.log(index);
      this.cartFurniture.furnitureId=number;
      this.cartFurniture.userEmail=JSON.parse(localStorage.getItem('userEmail'));
      this.cartFurniture.add=true;
      if(index>-1){
        if(check){
          if(! this.toaster.currentlyActive){
            this.toaster.info("It is already present in the cart!");
          }
          
        }
        
        return new Observable<any>();
      }
      console.log(this.cartFurniture);
      this.cart.push(number);
      this.cartSize.emit(this.cart.length);
      console.log(this.cart);
      return this.http.post(AppConstants.baseURL+'cart/addfurniture',this.cartFurniture, {
        responseType: 'text' as 'json'
      });
      
    }
    changeQuantity(number:number,add:boolean):Observable<any>{
      this.cartFurnitureIncrease.furnitureId=number;
      this.cartFurnitureIncrease.add=add;
      this.cartFurnitureIncrease.userEmail=JSON.parse(localStorage.getItem('userEmail'));
      return this.http.post(AppConstants.baseURL+'cart/changequantity',this.cartFurnitureIncrease, {
        responseType: 'text' as 'json'
      })
    }
  

    getAllFurnitureOfCart():Observable<any>{
      this.email=JSON.parse(localStorage.getItem('userEmail'));
      console.log(this.email);
      return this.http.get<FurnitureCart[]>(AppConstants.baseURL+'cart/getfurniture?email='+this.email);
    }

    deleteFurniture(number:number):Observable<any>{
      const index:number=this.cart.indexOf(number);
      this.cart.splice(index,1);
      this.cartSize.emit(this.cart.length);
      this.cartFurnitureIncrease.furnitureId=number;
      this.cartFurnitureIncrease.userEmail=JSON.parse(localStorage.getItem('userEmail'));
      return this.http.post(AppConstants.baseURL+'cart/removecart',this.cartFurnitureIncrease, {
        responseType: 'text' as 'json'
    })
    }

    getAllFurnitureIds(){
      console.log("getAllFurnitureIds");
      this.email=JSON.parse(localStorage.getItem('userEmail'));
      if(this.email == null){
        console.log(this.email);
        return;
      }
      this.http.get<any[]>(AppConstants.baseURL+"cart/getfurnitureids?email="+this.email).subscribe((data)=>{
        this.cart=data;
        this.cartSize.emit(this.cart.length);
        console.log(this.email);
        console.log(this.cart);
      })
    }
    emptyFurniture(){
      this.cart=[];
      this.cartSize.emit(this.cart.length);
    }

}
