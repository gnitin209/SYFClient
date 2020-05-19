import { DisplayFurnitureDTO } from './../models/displayFurnitureDTO';
import { Product } from './../models/productDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/shared/models/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  constructor(private http:HttpClient) { }
  
    public displayFurniture(){
      return this.http.get<DisplayFurnitureDTO[]>(AppConstants.baseURL+"furniture/displayFurniture");
    }

    public viewProduct(id :number){
      return this.http.get<Product>(AppConstants.baseURL+"furniture/viewFurniture?furnitureId="+id);
    }
    

 
public getOrderHistory(email:string){
return this.http.get<DisplayFurnitureDTO[]>(AppConstants.baseURL+"order/displayorder?userEmail="+email);
 }

}
