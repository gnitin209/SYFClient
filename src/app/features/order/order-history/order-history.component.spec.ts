import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserService } from './../../../shared/services/browser.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryComponent } from './order-history.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let mockOperationsService;

  let http: HttpClient;

  let mockFormGroup;

  let mockFormBuilder;


  let mockRouter: Router;

  let mockToaster: ToastrService;
  let mockHttpApiService;
  let mockNgxSpinner;
  let l;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [OrderHistoryComponent],
        imports: [CommonModule,
          FormsModule,
          RouterTestingModule.withRoutes([]),
          ToastrModule.forRoot(),
          NgxSpinnerModule,
          HttpClientTestingModule,
          NgbModule,
          BrowserAnimationsModule
        ],
        providers: [
          BrowserService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockHttpApiService = jasmine.createSpyObj(["getOrderHistory"]);
    
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("get a Order History List",()=>{
    mockHttpApiService.getOrderHistory.and.returnValue({subscribe:()=>{}});
    mockRouter = TestBed.get(Router);
    mockNgxSpinner=TestBed.get(NgxSpinnerService);
    
    component = new OrderHistoryComponent(mockRouter,mockHttpApiService,mockNgxSpinner);

    component.ngOnInit();
  //component.viewProduct(event,1);
   //expect(component.getOrderHisto).toBe(this.player);
    })
   
});
