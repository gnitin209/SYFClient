import { UserService } from './user.service';
import { TestBed, getTestBed } from '@angular/core/testing';

import { LoginServiceService } from './login-service.service';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { AppConstants } from "src/app/shared/models/AppConstants";

describe('LoginServicesService', () => {
    let injector: TestBed;
    let service: LoginServiceService;
    let httpMock: HttpTestingController;
    let userEmail:String;
    let userPassword:String;
  let file1:any;
  let uploadFurnitureAdressUrl= AppConstants.baseURL ;
  
  let http:any;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [LoginServiceService]
      });
      injector = getTestBed();
      service = injector.get(LoginServiceService);
      httpMock = injector.get(HttpTestingController);
    });
  let dm="saved";
 userEmail="p@gmail.com";
 userPassword="123";
  
  it('should return a message', () => {
   

    service.getUser(userEmail).subscribe( data=> {
 expect(data).toEqual(null);
    });
    const req = httpMock.expectOne(uploadFurnitureAdressUrl+"user/loginGmail?userEmail="+ userEmail);
    expect(req.request.method).toBe('GET');
    // req.flush(dummyMessage);
  });

  it('should return a message', () => {
    
 
     service.login(userEmail,userPassword).subscribe( data=> {
  expect(data).toEqual(null);
     });
     const req = httpMock.expectOne(uploadFurnitureAdressUrl+"user/login?userEmail="+ userEmail + '&userPassword=' + userPassword);
     expect(req.request.method).toBe('GET');
     // req.flush(dummyMessage);
   });
       

});

