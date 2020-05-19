import { TestBed, getTestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { AppConstants } from "src/app/shared/models/AppConstants";

describe('OrderService', () => {
    let injector: TestBed;
    let service: OrderService;
    let httpMock: HttpTestingController;
  let userEmail:String;
  let file:any;
 let uploadFurnitureAdressUrl= AppConstants.baseURL ;
  
  let http:any;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [OrderService]
      });
      injector = getTestBed();
      service = injector.get(OrderService);
      httpMock = injector.get(HttpTestingController);
    });
  let dm="user is not present";
  userEmail="p@gmail.com";
    it('should return a message', () => {
        service.addOrder(userEmail).subscribe((result) => {
          expect(result).toEqual(null);
        });

        const req = httpMock.expectOne(uploadFurnitureAdressUrl+"order/addorder?userEmail="+ userEmail);
        expect(req.request.method).toBe('GET');
      //  req.flush();
      });
  
       

});


