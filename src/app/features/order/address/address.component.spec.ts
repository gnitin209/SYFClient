import { NgxSpinnerModule } from 'ngx-spinner';
import { UserRoutingModule } from '../../user/user-routing.module';
import { OrderRoutingModule } from '../order-routing.module';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../../shared/models/AppConstants';
import { AddressDto } from '../../../shared/models/AddressDto';
import { AddressService } from '../../../shared/services/address.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';
//import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

describe('AddressComponent', () => {

  
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let mockOperationsService ;
  let http:HttpClient;
let l;
let mockOperationsService1:AddressService=new AddressService(http);
let mockFormGroup;
let loginForm:FormGroup;
let mockFormBuilder;
let formBuilder: FormBuilder=new FormBuilder();
let router:Router;
//let mockToaster:ToastrService;
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [AddressComponent],
          imports: [
            CommonModule,
            OrderRoutingModule,
            ToastrModule.forRoot(),
            UserRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            RouterModule,
            NgxSpinnerModule,
           // NgbModule,
          ]

      });
    }));
  });

      // create component and test fixture
//       fixture = TestBed.createComponent(AddressComponent);

//       mockOperationsService = jasmine.createSpyObj(["Add"]);
//       // get test component from the fixture
//       component = fixture.componentInstance;
//       component.ngOnInit();

//   }));
//   it('submitting a form adds a address', () => {
//     component.loginForm = component.formBuilder.group({
//       addressStreet:["", [Validators.required,Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
//       addressCity:  ["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
//       addressDistrict:["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
//       addressState: ["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
//       addressPincode:["",[Validators.required,Validators.pattern("^[1-9][0-9]{5}")]],
//       addressCountry: ["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
// 		});
//     component.loginForm.controls['addressStreet'].setValue("bantalab");
//     component.loginForm.controls['addresCity'].setValue("Jammu");
// component.loginForm.controls['addressDistrict'].setValue("Jammu");
// component.loginForm.controls['addressState'].setValue("Jammu");
// component.loginForm.controls['addressPincode'].setValue("181123");
// component.loginForm.controls['addressCountry'].setValue("India");


// mockOperationsService.Add.and.returnValue({subscribe: () => {}});
// // mockOperationsService.addImage.and.returnValue({subscribe: () => {}});


// localStorage.setItem('userEmail',"harshada");
//   //localStorage.setItem('name',"harshada");

// // mockOperationsService1.getLoggedInName.subscribe(name => (l = name));

// // let funiture: Furniture;

// mockOperationsService = jasmine.createSpyObj(["Add"]);

// mockFormBuilder = jasmine.createSpyObj(["group"]);
// router=TestBed.get(Router)

// //  component.furniture.furnitureType = component.registerForm.value.type;
// //  component.furniture.furniturePrice = component.registerForm.value.price;
// //  component.furniture.userEmail = JSON.parse(localStorage.getItem("userEmail"))
// //  component.furniture.furnitureMaterial = component.registerForm.value.material;
// //  component.furniture.furnitureShippingCharge = component.registerForm.value.shiping_charge;
// //  component.furniture.furnitureDescription = component.registerForm.value.description;
// //  component.furniture.furnitureQuantity = component.registerForm.value.quantity;
// //  component.furniture.furnitureName = component.registerForm.value.name;
// //  component.furniture.furnitureShippingCharge = component.registerForm.value.shipping_charge;

//     mockOperationsService.Add.and.returnValue({subscribe: () => {}});
//    // mockOperationsService.addImage.and.returnValue({subscribe: () => {}});
//     mockFormBuilder.group.and.returnValue(formBuilder);
//    // mockOperationsService1.getLoggedInName.subscribe(name => (l = name));

//    component = new AddressComponent(mockOperationsService1,router,formBuilder);

//    component.ngOnInit();
//    component.f;

//    component.Add();
//   // expect(mockOperationsService.addFurniture(funiture)).toHaveBeenCalled();
//    ///expect(mockOperationsService.addImage(component.file)).toHaveBeenCalled();


// });

// });
