import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { AppConstants } from 'src/app/shared/models/AppConstants';
import { User } from "src/app/shared/models/user";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: String;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { 
  }
  public saveUser(user : User)
  {  return this.http.post<any>(AppConstants.baseURL+"user/adduser",user,{responseType:'text' as 'json'});
  }

// public getLoggedIn()
// {
// return(    this.getLoggedInName.emit(true))
// }

  public saveSocialUser(user : User)
  {
    return this.http.post<any>(AppConstants.baseURL+"user/addgmailuser",user,{responseType:'text' as 'json'});
  }
}
