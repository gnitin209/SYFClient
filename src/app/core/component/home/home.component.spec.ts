import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactusComponent } from './../contactus/contactus.component';
import { AboutComponent } from './../about/about.component';
import { FooterComponent } from './../footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from './../../../features/order/order.module';
import { FormsModule } from '@angular/forms';
import { FurnitureModule } from './../../../features/furniture/furniture.module';
import { UserModule } from './../../../features/user/user.module';
import { PostFurnitureComponent } from './../../../features/furniture/post-furniture/post-furniture.component';
import { CoreRoutingModule } from './../../core-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './../../../shared/services/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewProductComponent } from './../../../features/furniture/view-product/view-product.component';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { DisplayFurnitureDTO } from './../../../shared/models/displayFurnitureDTO';
import { Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserService } from './../../../shared/services/browser.service';
import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs";
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockBrowserService ;
  let mockCartService :CartService;
  let http:HttpClient;
  let mockSpinner:NgxSpinnerService;
  let mockRouter:Router;
  let id:number;
  let mockToaster:ToastrService;
  let furniture :DisplayFurnitureDTO[];
  let data: DisplayFurnitureDTO[]=[
    {
      furnitureId : 1,
      furnitureType :"",
      furniturePrice : 0,
      imageContent : "",
      furnitureMaterial:"",
      furnitureType1:"",
      furnitureShipping:"",
    }
  ]


  beforeEach(async(() => {
  TestBed.configureTestingModule({
  declarations: [HomeComponent,FooterComponent, AboutComponent, ContactusComponent],
  imports: [ 
  RouterTestingModule,
  ToastrModule.forRoot(),
  NgxSpinnerModule,
  HttpClientTestingModule,
  CoreRoutingModule,
  HttpClientModule,
  NgxSpinnerModule,
  ToastrModule.forRoot(),
  CommonModule,
  UserModule,
  FurnitureModule,
  FormsModule,
  OrderModule,
  ReactiveFormsModule,
  BrowserAnimationsModule
  ],
  
  }
  )
  .compileComponents();
  }));
  
  beforeEach(() => {
  fixture = TestBed.createComponent(HomeComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });
  it("Displays furniture details in homepage",()=>{
 
  mockBrowserService=jasmine.createSpyObj(['displayFurniture']);
  mockRouter=TestBed.get(Router)
  mockSpinner=TestBed.get(NgxSpinnerService);

  mockBrowserService.displayFurniture.and.returnValue({subscribe: (data) => {furniture=data}});
  component= new HomeComponent(mockCartService,mockSpinner,mockBrowserService,mockRouter,mockToaster);
  component.ngOnInit();
  expect(mockBrowserService.displayFurniture).toHaveBeenCalled();
 // component.addToCart(id);
  //component.viewProduct(id);
  
  
  })
  
});
