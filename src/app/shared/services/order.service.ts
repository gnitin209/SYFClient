import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from "src/app/shared/models/AppConstants";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  addOrder(userEmail):any
  {
  
		return this.http.get(AppConstants.baseURL + 'order/addorder?userEmail=' + userEmail,{responseType:'text' as 'json'});

}
}
