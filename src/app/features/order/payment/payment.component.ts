import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from '../../../shared/services/order.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from '@angular/core';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  userEmail: String;
  message: any;
  payment: boolean = false;
  cash: boolean = false;
  loginForm: FormGroup;
  userEmail1: String;
  furniture:any;
  price:number;
  p:boolean=true;
  handleError(error: any): void { }
  constructor(private services:
    OrderService,
    private cartService: CartService,
    private services1: OrderService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router, ) {

  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      cardholdername: ["", [Validators.required, Validators.pattern("^[a-zA-Z\\s]*$")]],
      cardnumber: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{15}")]],
      cvv: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{2}")]],


    });
    console.log(JSON.parse(localStorage.getItem('cart')));

  }

  submitted = false;


  payC() {
    console.log("working");
    console.log("dsds");
     this.userEmail = JSON.parse(localStorage.getItem('userEmail'));
   // this.userEmail = "p@gmail.com";



    this.services.addOrder(this.userEmail).subscribe(data => {
      this.message=data;


      console.log(this.message);
      this.cartService.emptyFurniture();
      this.toaster.success("successfully ordered:");
      this.router.navigateByUrl("/home");


    },
    error => {
console.log(JSON.parse(error.error).errorMessage);
      this.toaster.error(JSON.parse(error.error).errorMessage);
      console.log(error);
    }

    );
  }
  pay()
  {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log("working");
    console.log("dsds");
     this.userEmail = JSON.parse(localStorage.getItem('userEmail'));
    //this.userEmail = "p@gmail.com";



    this.services.addOrder(this.userEmail).subscribe(data => {
    this.message = data
   // console.log(this.message);

      this.cartService.emptyFurniture();
      this.toaster.success("successfully ordered");
      this.router.navigateByUrl("/home");
    },
      error => {
        this.toaster.error(JSON.parse(error.error).errorMessage);
        console.log(error);
      }

    );

  }


  payByCard() {
    console.log(JSON.parse(localStorage.getItem('cart')));
    this.furniture = JSON.parse(localStorage.getItem('cart'));
   this.price=0;
    for(var f of this.furniture){
      console.log(f.furniturePrice);
      console.log(f.furnitureQuanitity);
      this.price+=(f.furniturePrice*f.furnitureQuanitity);
     }
     console.log(this.price);
     this.p=false;
    this.payment = true;
  }
  payCod() {
    console.log(JSON.parse(localStorage.getItem('cart')));
    this.furniture = JSON.parse(localStorage.getItem('cart'));
    this.price=0;
    for(var f of this.furniture){
      console.log(f.furniturePrice);
      console.log(f.furnitureQuanitity);
      this.price+=(f.furniturePrice*f.furnitureQuanitity);
     }
     this.p=false;
    this.cash = true;
  }
  get f() {
    return this.loginForm.controls;
  }


}
