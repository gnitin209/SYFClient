
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from "./../../../core/component/home/home.component";
import {
  AuthService,
  AuthServiceConfig,
  SocialLoginModule
} from "angularx-social-login";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { Router, RouterModule } from "@angular/router";
import { LoginServiceService } from "./../../../shared/services/login-service.service";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/shared/services/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormsModule,
  Validators
} from "@angular/forms";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SignupComponent } from "./signup.component";
import { UserRoutingModule } from "src/app/features/user/user-routing.module";
import { CommonModule } from "@angular/common";
import { provideConfig } from "src/app/app.module";
import { SocialUser } from "angularx-social-login";

describe("SignupComponent", () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockOperationsService;

  let http: HttpClient;
  let authservice: AuthService;

  let mockFormGroup;

  let registerForm: FormGroup;

  let mockFormBuilder;

  let formBuilder: FormBuilder = new FormBuilder();

  let mockRouter: Router;

  let mockToaster: ToastrService;
  
  let user:SocialUser;
  let l;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SignupComponent, HomeComponent],
        imports: [CommonModule,
          ReactiveFormsModule,
          FormsModule,
          RouterTestingModule.withRoutes([]),
          ToastrModule.forRoot(),
          NgxSpinnerModule,
          SocialLoginModule,
          HttpClientTestingModule,
          NgbModule
        ],
        providers: [
          UserService,
          AuthService,
          { provide: AuthServiceConfig, useFactory: provideConfig }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  let user1=SocialUser;
  it("Adds a User details", () => {

component.authService.authState.subscribe((user) => {
  this.user1 = user;
  this.loggedIn = (user1 != null);
  
});

    component.profileGroup = component.formBuilder.group({
      userFirstName: [
        "",
        [
          Validators.required,
          Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")
        ]
      ],
      userLastName: [
        "",
        [
          Validators.required,
          Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")
        ]
      ],
      userEmail: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9](\.?[a-z0-9])+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ]
      ],
      userPassword: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&_()+=*'[\\]{}|~?/\\\\<>,.\";:-]).{8,15})"
          )
        ]
      ],
      userPhoneNumber: [
        "",
        [Validators.required, Validators.pattern("^[1-9][0-9]{9}")]
      ]
    });
    component.profileGroup.controls["userFirstName"].setValue("Nitin");
    component.profileGroup.controls["userLastName"].setValue("Nitin");
    component.profileGroup.controls["userEmail"].setValue(
      "gnitin2312@gmail.com"
    );
    component.profileGroup.controls["userPassword"].setValue("Nitiin@12");
    component.profileGroup.controls["userPhoneNumber"].setValue("8572008762");

    mockOperationsService = jasmine.createSpyObj("saveUserDetails", [
      "saveUser","signUp","signUpWithFB"
    ]);
    // mockRouter = TestBed.get(Router);
    // mockFormBuilder = jasmine.createSpyObj(["group"]);
    //  mockFormBuilder.group.and.returnValue(formBuilder);
    // // authservice = jasmine.createSpyObj(["authState"]);
    // // authservice.authState.and.returnValue({ subscribe: () => {} });

    // mockOperationsService.saveUser.and.returnValue({ subscribe: () => {} });
    // component = new SignupComponent(
    //   mockFormBuilder,
    //   authservice,
    //   mockOperationsService,
    //   mockFormGroup,
    //   mockRouter,
    //   mockToaster
    // );
    //  //let formValidSpy = spyOnProperty(mockOperationsService.prof, 'valid', 'get').and.returnValue(true);
    //component.ngOnInit();
    //component.f;
  //  component.signUp();
    //component.saveUserDetails();
    //component.signUpWithFB();
    //expect(mockOperationsService.saveUser).toHaveBeenCalled();
  
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
