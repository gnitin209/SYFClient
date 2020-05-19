import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginFbDto } from '../../../shared/models/LoginFbDto';
import { LoginGmailDto } from '../../../shared/models/LoginGmailDto';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from "@angular/router";
import { LoginServiceService } from 'src/app/shared/services/login-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import {
  ElementRef,
  NgZone,
  ErrorHandler,
  ViewChild
} from '@angular/core';
import { LoginDto } from "src/app/shared/models/LoginDTO";



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  l: boolean = false;
  userLoginMessage: String;
  userEmail: String;
  userPassword: String
  message: any;
  loginForm: FormGroup;
  logi: LoginDto;
  u: LoginGmailDto = new LoginGmailDto();
  us: LoginFbDto = new LoginFbDto();
  loggedIn: boolean;
  auth2: any;
  user: SocialUser;


  constructor(
    private services: LoginServiceService,
    private ngZone: NgZone,
    private router: Router,
    private service: UserService,
    private authService:AuthService,
    private toastr: ToastrService,
  private cartService: CartService) { }


  // handleError(error: any): void { }
  // @ViewChild('loginRef', { static: true }) loginElement: ElementRef;

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        userEmail: new FormControl(Validators.required, Validators.email),
        userPassword: new FormControl(Validators.required),

      });

  }
  login() {

    if (this.loginForm.invalid) {
    alert('Please enter valid details');
    return;
    }

    this.userPassword = this.loginForm.value.userPassword;
    this.userEmail = this.loginForm.value.userEmail;
    console.log("password" + this.userPassword + " user name " + this.userEmail);

    this.services.login(this.userEmail, this.userPassword).subscribe(data => {
    this.message = data;
    console.log(this.message);
    if (this.message === "false")
    {
    this.userLoginMessage = "Invalid User credetials";

    // localStorage.setItem('name', JSON.stringify(this.user.firstName));
    }
    else {
    localStorage.setItem('userEmail', JSON.stringify(this.userEmail));
    localStorage.setItem('name', JSON.stringify(this.message));
    console.log(this.message);
    localStorage.setItem('loggedIn', JSON.stringify(true));
    console.log("saved");
    this.cartService.getAllFurnitureIds();
    this.router.navigateByUrl("/home");
    this.services.setUserName();


    }
    });
    }





  //   prepareLoginButton() {
  //     this.auth2.attachClickHandler(
  //       this.loginElement.nativeElement,
  //       {},
  //       googleUser => {
  //         let profile = googleUser.getBasicProfile();
  //         console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //         console.log('ID: ' + profile.getId());
  //         console.log('Name: ' + profile.getName());
  //         console.log('Image URL: ' + profile.getImageUrl());
  //         console.log('Email: ' + profile.getEmail());
  //         this.u = new LoginGmailDto();
  //         this.u.email = profile.getEmail();

  //         // console.log(this.userRole);
  //         this.services.getUser(this.u.email).subscribe(data => {
  //           this.message = data;
  //           //localStorage.setItem('userRole', JSON.stringify(data))
  //           if (this.message) {
  //             localStorage.setItem('userEmail', JSON.stringify(this.u.email));
  //             //   localStorage.setItem('userRole', JSON.stringify(this.userRole));
  //             // console.log(this.userRole);
  //             //    console.log(JSON.parse(localStorage.getItem("user")));
  //             this.ngZone.run(() => this.log());
  //             this.services.setUserName();

  //             // this.log();
  //           }
  //           else {
  //             this.userLoginMessage = "you should sign up first:";
  //           }
  //         });
  //       },
  //       error => {
  //         alert(JSON.stringify(error, undefined, 2));
  //       }
  //     );
  //   }
  //   googleSDK() {
  //     window['googleSDKLoaded'] = () => {
  //       window['gapi'].load('auth2', () => {
  //         this.auth2 = window['gapi'].auth2.init({
  //           client_id:
  //           '1028317956608-eq3mr94vqql5lg83uehso9871e5ts400.apps.googleusercontent.com',
  //           // cookiepolicy: 'single_host_origin',
  //           scope: 'profile email'
  //         });
  //         this.prepareLoginButton();
  //       });
  //     };

  //     (function (d, s, id) {
  //       var js,
  //         fjs = d.getElementsByTagName(s)[0];
  //       if (d.getElementById(id)) {
  //         return;
  //       }
  //       js = d.createElement(s);
  //       js.id = id;
  //       js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
  //       fjs.parentNode.insertBefore(js, fjs);
  //     })(document, 'script', 'google-jssdk');
  //   }

  //   fbLibrary() {
  //     (window as any).fbAsyncInit = function () {
  //       window['FB'].init({
  //         appId: '2511041065667762',
  //         cookie: true,
  //         xfbml: true,
  //         version: 'v3.1'
  //       });
  //       window['FB'].AppEvents.logPageView();
  //     };

  //     (function (d, s, id) {
  //       var js,
  //         fjs = d.getElementsByTagName(s)[0];
  //       if (d.getElementById(id)) {
  //         return;
  //       }
  //       js = d.createElement(s);
  //       js.id = id;
  //       js.src = 'https://connect.facebook.net/en_US/sdk.js';
  //       fjs.parentNode.insertBefore(js, fjs);
  //     })(document, 'script', 'facebook-jssdk');
  //   }
  //   loginFB() {
  //     window['FB'].login(
  //       response => {
  //         console.log('login response', response);
  //         if (response.authResponse) {
  //           window['FB'].api(
  //             '/me',
  //             {
  //               fields: 'last_name, first_name, email'
  //             },
  //             userInfo => {
  //               console.log('user information');
  //               console.log(userInfo.last_name);
  //               console.log(userInfo);
  //               this.us = new LoginFbDto();
  //               this.us.userEmail = userInfo.email;


  //               this.services.getUser(this.us.userEmail).subscribe(data => {
  //                 this.message = data;
  //                 if (this.message) {
  //                   localStorage.setItem('userEmail', JSON.stringify(this.us.userEmail));
  //                   // localStorage.setItem('userRole', JSON.stringify(this.userRole));
  //                   console.log(JSON.parse(localStorage.getItem('userEmail')));
  //                   this.ngZone.run(() => this.log());
  //                   this.services.setUserName();

  //                 }
  //                 else {
  //                   this.userLoginMessage = "you should signup first:";
  //                 }
  //               });
  //             }
  //           );
  //         } error => {
  //           alert(JSON.stringify(error, undefined, 2));
  //         }
  //       },
  //       { scope: 'email' }
  //     );
  //   }

  //   get f() {
  //     return this.loginForm.controls;
  //   }
  // }

//SECOND METHOD

  logInGmail() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
      this.authService.authState.subscribe((user) => {
        this.user = user;
        //console.log(this.u.email);
        if (user != null) {
          this.u.email = this.user.email;
          this.services.getUser(this.u.email).subscribe(data => {
            this.loggedIn = data;
            console.log(this.loggedIn);
            if (this.loggedIn) {
              localStorage.setItem('userEmail', JSON.stringify(this.u.email));
              localStorage.setItem('loggedIn', JSON.stringify(true));
              localStorage.setItem('name', JSON.stringify(this.user.firstName));
              this.cartService.getAllFurnitureIds();

              this.ngZone.run(() => this.log());
              this.services.setUserName();
            }
            else {
              //this.message = "Invalid";
              this.userLoginMessage = "you should signup first";
              //this.router.navigateByUrl("/signup");
            }
          });
        }
        else {
          //console.log("hhh");
          this.message = "Invalid";
          this.userLoginMessage = "No gmail account ";
          //this.router.navigateByUrl("/signup");
        }
      });
    });
  }
  log() {
    this.router.navigateByUrl('/home');
  }
  logInFb() {
    console.log("sssss");
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      console.log("sadads" + user);

      this.authService.authState.subscribe((user) => {
        this.user = user;
        if (this.user != null) {
          this.us.email = this.us.email;
          console.log(this.us.email);
          this.services.getUser(this.us.email).subscribe(data => {
            this.loggedIn = data
            // console.log("socialUser" + this.us.userEmail);
            if (this.loggedIn) {
              localStorage.setItem('userEmail', JSON.stringify(this.us.email));
              localStorage.setItem('loggedIn', JSON.stringify(true));
              localStorage.setItem('name', JSON.stringify(this.user.firstName));
              this.cartService.getAllFurnitureIds();

              this.ngZone.run(() => this.log());
              this.services.setUserName();``

            }
            else {
              //this.message = "Invalid";
              this.userLoginMessage = "you should signup first";
              // this.router.navigateByUrl("/signup");
            }//
          });
        }
        else {
          console.log("outing:::");
          this.message = "Invalid";
          this.userLoginMessage = "No Facebook account ";
        }
      });
    });
  }

}
