import { UserService } from "src/app/shared/services/user.service";
import { FurnitureService } from "./../../../shared/services/furniture.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AppConstants } from "src/app/shared/models/AppConstants";
import { LoginServiceService } from "src/app/shared/services/login-service.service";
import { ToastrService } from "ngx-toastr";

import { SearchFurnitureComponent } from "./../../../features/furniture/search-furniture/search-furniture.component";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { CartService } from "src/app/shared/services/cart.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  sizeCart: any;
  l: boolean = false;
  search = new FormControl("");
  text: string;
  userName: any;
  cartUser: boolean = false;
  subscription: Subscription;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private service: LoginServiceService,
    private cartService: CartService
  ) {
    this.cartService.cartSize.subscribe(data => {
      this.sizeCart = data;
      console.log(this.sizeCart);
    });
    // this.subscription = this.cartService.getNumber().subscribe( number => { this.sizeCart = number.text,
    // console.log(number) });
  }

  ngOnInit() {
    this.service.getLoggedInName.subscribe(name => (this.l = name));
    this.service.getUserName.subscribe(name => (this.userName = name));
    this.cartService.getAllFurnitureIds();
    if (this.l) {
      this.l = true;
    } else {
      this.l = JSON.parse(localStorage.getItem("loggedIn"));
      this.userName = JSON.parse(localStorage.getItem("name"));

      if (this.l) {
      } else {
        this.l = false;
      }
    }

    //if (this.l) {
    // 	//this.l=true;
    // }
    //   else{
    // 		//this.l=false;
    // 	  }	//this.service.getLoggedInName().subscribe((data) => this.l = data);
  }
  onEnter() {
    if (
      this.search.value.length !== 0 &&
      this.search.value.match(/^ *$/) === null
    ) {
      this.router.navigate(["/search/", this.search.value]);
    }
  }
  signOut() {
    console.log("signOut");

    this.router.navigate(["/home"]);

    localStorage.clear();
    this.service.setUserName();
    this.cartService.emptyFurniture();
  }
  cart() {
    //this.service.getLoggedInName.subscribe(name=>this.cartUser=name);
    var email = JSON.parse(localStorage.getItem("userEmail"));
    if (email != null) {
      this.router.navigate(["/cart"]);
    } else {
      this.toastr["warning"]("Please Log In First, You are not logged in!");
      this.router.navigate(["/login"]);
    }
  }
  post() {
    this.service.getLoggedInName.subscribe(name => (this.l = name));

    if (this.l) {
      this.router.navigate(["/post"]);
    } else {
      // this.toastr.error("You are Not Loggedin","Please Login First",
      //  10)
      this.toastr["warning"]("Please Log In first", "You are not logged In ");
      this.router.navigate(["/login"]);

      // 	console.log("else");
      // 	const Swal = require('sweetalert2');
      // 	AppConstants.loggedin = false;
      // 	this.l = false;
      // 	Swal.fire({
      // 		title: '!',
      // 		text: 'To Add Furniture Please Login First',
      // 		icon: 'info',
      // 		showConfirmButton: true,
      // 		showCancelButton: true
      // 	}).then(willDelete => {
      // 		if (willDelete.value) {
      // 			this.router.navigate(['/login']);
      // 		} else {
      // 			this.router.navigate(['/home']);
      // 		}
      // 		console.log(willDelete);
      // 	});
    }
  }
  get() {
    this.service.getLoggedInName.subscribe(name => (this.l = name));

    if (this.l) {
      this.router.navigate(["/orderHistory"]);
    } else {
      // this.toastr.error("You are Not Loggedin","Please Login First",
      // 10)
      this.toastr["warning"]("Please Log In first", "You are not logged In ");
      this.router.navigate(["/login"]);
    }
  }
}
