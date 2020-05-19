import { AddressDto } from '../models/AddressDto';
import { TestBed, getTestBed } from '@angular/core/testing';

import { AddressService } from './address.service';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { AppConstants } from "src/app/shared/models/AppConstants";

describe('AddressService', () => {
    let injector: TestBed;
    let service: AddressService;
    let httpMock: HttpTestingController;
  let address:AddressDto=new AddressDto();
  let file: File;
//   let uploadPropertyAdressUrl= AppConstants.baseURL + "furniture/savefile";
  
  let http:any;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AddressService]
      });
      injector = getTestBed();
      service = injector.get(AddressService);
      httpMock = injector.get(HttpTestingController);
    });
  
  
    it('should return a message', () => {
      const dummyMessage="Saved"
  
      service.add(address).subscribe( data=> {
   expect(data).toEqual(dummyMessage);
      });
  
      const req = httpMock.expectOne("http://localhost:8080/address/addAddress");
      expect(req.request.method).toBe('POST');
      req.flush(dummyMessage);
    });
  
       

});
