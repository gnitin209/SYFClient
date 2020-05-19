import { Product } from './../models/productDTO';
import { DisplayFurnitureDTO } from './../models/displayFurnitureDTO';
import { TestBed } from '@angular/core/testing';
import { getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { AppConstants } from '../models/AppConstants';
import { BrowserService } from './browser.service';

describe('BrowserService', () => {

    let injector: TestBed;
    let service: BrowserService;
    let httpMock: HttpTestingController;
    let id: number;
    let email:string;
  
  let http:any;
    beforeEach(() => {
       
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [BrowserService]
      });
      injector = getTestBed();
      service = injector.get(BrowserService);
      httpMock = injector.get(HttpTestingController);
    });
  
  
    it('should return list of furniture', () => {
      const furniture: DisplayFurnitureDTO[] = []; 
      injector = getTestBed();
      service = injector.get(BrowserService);
      httpMock = injector.get(HttpTestingController);
      service.displayFurniture().subscribe( data=> {
   expect(data).toEqual(furniture);
      });
  
      const req = httpMock.expectOne("http://localhost:8080/furniture/displayFurniture");
      expect(req.request.method).toBe('GET');
      req.flush(furniture);
    }); 


    
    it('should return furniture details', () => {
      const  product : Product = new Product();
      service.viewProduct(id).subscribe( data=> {
   expect(data).toEqual(product);
      });
  
      const req = httpMock.expectOne("http://localhost:8080/furniture/viewFurniture?furnitureId="+id);
      expect(req.request.method).toBe('GET');
      req.flush(product);
    }); 
    
    it('should return order history', () => {
      const furniture: DisplayFurnitureDTO[] = []; 
      injector = getTestBed();
      service = injector.get(BrowserService);
      httpMock = injector.get(HttpTestingController);
      service.getOrderHistory(email).subscribe( data=> {
   expect(data).toEqual(furniture);
      });
  
      const req = httpMock.expectOne("http://localhost:8080/order/displayorder?userEmail="+email);
      expect(req.request.method).toBe('GET');
      req.flush(furniture);
    }); 


});
