import { AddressDto } from '../models/AddressDto';
import { AppConstants } from '../models/AppConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  add(addressDto : AddressDto) 
  {
		return this.http.post<any>(AppConstants.baseURL+"address/addAddress",addressDto,{responseType:'text' as 'json'}); 
	
}
}

