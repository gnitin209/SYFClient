import { ToastrService, ToastrModule } from 'ngx-toastr';
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

import { TestBed, getTestBed } from "@angular/core/testing";

import { CartService } from './cart.service';

describe('CartService', () => {
    let injector: TestBed;
    let service: CartService;
    let httpMock: HttpTestingController;
    let http : any;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,ToastrModule.forRoot()],
            providers: [CartService,{provide: ToastrService, useClass: ToastrService}],
          });
          injector = getTestBed();
          service = injector.get(CartService);
          httpMock = injector.get(HttpTestingController);
    });

    it('be able add funriture to cart',()=>{
        injector = getTestBed();
        service = injector.get(CartService);
        httpMock = injector.get(HttpTestingController);

        const dummyMessage="Furniture added to cart";
        service.sendNumber(1,true).subscribe((data)=>{
            expect(data).toBe(dummyMessage);
        });
        const req= httpMock.expectOne("http://localhost:8080/cart/addfurniture");
        expect(req.request.method).toBe('POST');
        req.flush(dummyMessage);

    })

    it('be able to change quantity of furniture',()=>{
        injector = getTestBed();
        service = injector.get(CartService);
        httpMock = injector.get(HttpTestingController);
        
        const dummyMessage="Furniture quantity increased";
        service.changeQuantity(1,true).subscribe((data)=>{
            expect(data).toBe(dummyMessage);
        })
        const req= httpMock.expectOne("http://localhost:8080/cart/changequantity");
        expect(req.request.method).toBe('POST');
        req.flush(dummyMessage);

    })

    it('be able get all furnitures',()=>{
        injector = getTestBed();
        service = injector.get(CartService);
        httpMock = injector.get(HttpTestingController);

        const dummyFurnitures=[];
        service.getAllFurnitureOfCart().subscribe((data)=>{
            expect(data).toBe(dummyFurnitures);
        })
        // const email="anshu.rubul@gmail.com"
        // const req=httpMock.expectOne("http://localhost:8080/cart/getfurniture?email="+email);
        // expect(req.request.method).toBe('GET');
        // req.flush(dummyFurnitures);
    })

    it('be able to delete furniture',()=>{
        injector = getTestBed();
        service = injector.get(CartService);
        httpMock = injector.get(HttpTestingController);

        const dummyMessage="Deleted successfully";
        service.deleteFurniture(1).subscribe((data)=>{
            expect(data).toBe(dummyMessage);
        })
        const req= httpMock.expectOne("http://localhost:8080/cart/removecart");
        expect(req.request.method).toBe('POST');
        req.flush(dummyMessage);
    })

    it('be able to retrieve all furniture ids inside cart',()=>{
        injector = getTestBed();
        service = injector.get(CartService);
        httpMock = injector.get(HttpTestingController);

        const dummyIds=[1];
        service.getAllFurnitureIds();
        // const req=httpMock.expectOne("http://localhost:8080/cart/getfurnitureids?email=anshu.rubul@gmail.com");
        // expect(req.request.method).toBe('GET');
        // req.flush(dummyIds);
        })
    it('be able to empty cart while logging out',()=>{
        injector = getTestBed();
        service = injector.get(CartService);
        httpMock = injector.get(HttpTestingController);
        service.emptyFurniture();
    })
});
