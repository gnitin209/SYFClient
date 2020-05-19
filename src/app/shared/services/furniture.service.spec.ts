import { Furniture } from './../models/Furniture';
import { TestBed } from '@angular/core/testing';
import { getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FurnitureService } from './furniture.service';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { AppConstants } from '../models/AppConstants';

describe('FurnitureService', () => {
  let injector: TestBed;
  let service: FurnitureService;
  let httpMock: HttpTestingController;
let furniture:Furniture;
let file: File;
let uploadPropertyAdressUrl= AppConstants.baseURL + "furniture/savefile";

let http:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FurnitureService]
    });
    injector = getTestBed();
    service = injector.get(FurnitureService);
    httpMock = injector.get(HttpTestingController);
  });


  it('should return a message', () => {
    const dummyMessage="Furniture Advertisemnt Posted Successfully"

    service.addFurniture('furniture').subscribe( data=> {
 expect(data).toEqual(dummyMessage);
    });

    const req = httpMock.expectOne("http://localhost:8080/furniture/addFurniture");
    expect(req.request.method).toBe('POST');
    req.flush(dummyMessage);
  });

      it('addImage(file1: File) should POST the image and return data', () => {
        service.addImage(file).subscribe((result) => {
          expect(result).toEqual(result);
        });

        const req = httpMock.expectOne( uploadPropertyAdressUrl);
        expect(req.request.method).toBe('POST');
      //  req.flush();
      });
});
