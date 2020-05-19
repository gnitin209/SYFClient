import { AppConstants } from './../models/AppConstants';
import { User } from './../models/user';
import { TestBed, getTestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
    let injector: TestBed;
    let service: UserService;
    let httpMock: HttpTestingController;
  let user:User;
  let file: File;
  let uploadPropertyAdressUrl= AppConstants.baseURL + "user/adduser";
  
  let http:any;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UserService]
      });
     });
  
  const user1={userFirstName:"Nitin",
  userLastName:"garg",
  userEmail:"gnitin2312@gmail.com",
  userPassword:"Nivaan@123",
  userPhoneNumber:"8572008762"}
    it('should return a message', () => {
        const dummyMessage="User Succesfully Signed Up"
        injector = getTestBed();
        service = injector.get(UserService);
        httpMock = injector.get(HttpTestingController);
      
        service.saveUser(user1).subscribe( data=> {
     expect(data).toEqual(dummyMessage);
        });
      })
        
    it('should return a message', () => {
        const dummyMessage="User Succesfully Signed Up"
        injector = getTestBed();
        service = injector.get(UserService);
        httpMock = injector.get(HttpTestingController);
      
        service.saveSocialUser(user1).subscribe( data=> {
     expect(data).toEqual(dummyMessage);
        });
    
        // const req = httpMock.expectOne("http://localhost:8080/addgmailuser/");
        // expect(req.request.method).toBe('POST');
        // req.flush(dummyMessage);
      });
});
