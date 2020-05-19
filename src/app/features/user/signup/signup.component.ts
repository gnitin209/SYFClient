import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider
} from "angularx-social-login";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { LoginServiceService } from 'src/app/shared/services/login-service.service';
import { ToastrModule,ToastrService } from 'ngx-toastr';

@Component({

  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,ErrorHandler {
  title: String;
  auth2: any;
  message: any;
  profileGroup: FormGroup;
  u: User = new User();
  loggedIn: boolean;
  mySubscription: any;
  user:SocialUser;
  click:any=false;
  handleError(error: any): void {}
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      
    });
   
    this.profileGroup = this.formBuilder.group({
      userFirstName: ["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
      userLastName: ["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
      userEmail: ["", [Validators.required,Validators.pattern(/^[a-z0-9](\.?[a-z0-9])+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      userPassword: ["", [Validators.required,Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&_()+=*'\[\\]\{}|\~?/\\\\<>,.\"\;:-]).{8,15})")]],
      userPhoneNumber: ["",[Validators.required,Validators.pattern("^[1-9][0-9]{9}")]],
      
    });
  } 
  constructor(
    
    private fb: FormBuilder, public authService: AuthService,
    private service: UserService,
    public formBuilder: FormBuilder,
    private router : Router,
    private toaster:ToastrService
    
  ) {}
  submitted=false;
 
  signUp() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
      if (this.user != null) {
        this.u.userEmail = this.user.email;
        this.u.userFirstName = this.user.firstName;
        this.u.userLastName = this.user.lastName;
      }
      try
      {
        this.service.saveSocialUser(this.u).subscribe(data =>{ console.log(data);
          this.toaster.success("User Sign-Up Successful");
          this.router.navigate(["/home"])
          
      },
     error => {this.toaster.error(error.error);
     }
    );
      }
      catch(error) {
        console.error('Log error', error);
      }
    });

}
signUpWithFB(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {  
    console.log(user);  
    if(this.user!=null)
      {
          this.u.userEmail = this.user.email;
    this.u.userFirstName = this.user.firstName;
    this.u.userLastName = this.user.lastName;
     }
     this.service.saveSocialUser(this.u).subscribe(data =>{ console.log(data);this.toaster.success("User Sign-Up Successful");
     this.router.navigate(["/home"])
    },
   error => {this.toaster.error("User Already Exist"); });    
     console.log("socialUser" +this.u);
  });  
}
saveUserDetails() {
   
    this.submitted = true;
    
           // stop here if form is invalid
           if (this.profileGroup.invalid) {
               return;}
    try {
      this.u = this.profileGroup.value;
      this.service.saveUser(this.u).subscribe(data =>{ console.log(data);this.toaster.success("User Sign-Up Successful");
    },
   error => {this.toaster.error("User Already Exist"); }); 
        
      this.router.navigateByUrl('/home');
   
    } catch (error) {}
  }
  get f() {
    return this.profileGroup.controls;
}
}
