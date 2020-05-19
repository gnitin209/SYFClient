import { FurnitureService } from './../../../shared/services/furniture.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFurnitureComponent } from './post-furniture.component';
import { Furniture } from 'src/app/shared/models/Furniture';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/shared/services/login-service.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FurnitureRoutingModule } from '../furniture-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('PostFurnitureComponent', () => {
  let component: PostFurnitureComponent;
  let fixture: ComponentFixture<PostFurnitureComponent>;
  let mockOperationsService ;
  let http:HttpClient;
let l;
let mockOperationsService1:LoginServiceService=new LoginServiceService(http);
let mockFormGroup;
let registerForm:FormGroup;
let mockFormBuilder;
let formBuilder: FormBuilder=new FormBuilder();
let router:Router;
let mockToaster:ToastrService;
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [PostFurnitureComponent],
          imports: [
            CommonModule,
            FurnitureRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            HttpClientModule,
            NgxSpinnerModule,
            ToastrModule.forRoot(),
            RouterTestingModule,
            NgbModule,
          ]

      })
      // create component and test fixture
      fixture = TestBed.createComponent(PostFurnitureComponent);

      mockOperationsService = jasmine.createSpyObj(["addFurniture","addImage"]);
      // get test component from the fixture
      component = fixture.componentInstance;
      component.ngOnInit();

  }));
  it('submitting a form adds a furniture', () => {
    component.registerForm = component.formBuilder.group({
			type: ['', Validators.required],
			price: ['', Validators.required],
			shipping: ['', Validators.required],
			shipping_charge: ['', Validators.pattern('^[0-9]*')],
			material: ['', Validators.required],
			description: ['', Validators.required],
			file: ['', Validators.required],
			quantity: ['', Validators.required],
			name: ['', Validators.required]
		});
    component.registerForm.controls['type'].setValue("sofa");
    component.registerForm.controls['material'].setValue("sofa");
component.registerForm.controls['price'].setValue("123");
component.registerForm.controls['shipping'].setValue("sofa");
component.registerForm.controls['shipping_charge'].setValue("123");
component.registerForm.controls['description'].setValue("sofa");
component.registerForm.controls['quantity'].setValue("123");
component.registerForm.controls['file'].setValue(component.file);

mockOperationsService.addFurniture.and.returnValue({subscribe: () => {}});
mockOperationsService.addImage.and.returnValue({subscribe: () => {}});

mockOperationsService1.getLoggedInName.subscribe(name => (l = name));

//let funiture: Furniture;

localStorage.setItem('name',"harshada")
mockFormBuilder = jasmine.createSpyObj(["group"]);
router=TestBed.get(Router)

//  component.furniture.furnitureType = component.registerForm.value.type;
//  component.furniture.furniturePrice = component.registerForm.value.price;
//  component.furniture.userEmail = JSON.parse(localStorage.getItem("userEmail"))
//  component.furniture.furnitureMaterial = component.registerForm.value.material;
//  component.furniture.furnitureShippingCharge = component.registerForm.value.shiping_charge;
//  component.furniture.furnitureDescription = component.registerForm.value.description;
//  component.furniture.furnitureQuantity = component.registerForm.value.quantity;
//  component.furniture.furnitureName = component.registerForm.value.name;
//  component.furniture.furnitureShippingCharge = component.registerForm.value.shipping_charge;

    mockOperationsService.addFurniture.and.returnValue({subscribe: () => {}});
    mockOperationsService.addImage.and.returnValue({subscribe: () => {}});
    mockFormBuilder.group.and.returnValue(formBuilder);
    mockOperationsService1.getLoggedInName.subscribe(name => (l = name));

   component = new PostFurnitureComponent(mockOperationsService,router,mockToaster,mockOperationsService1);

   component.ngOnInit();
   component.f;

   component.onSubmit();
   component.onReset();
   expect(mockOperationsService.addFurniture).toHaveBeenCalled();


});




  });



