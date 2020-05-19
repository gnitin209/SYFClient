import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddressService } from '../../../shared/services/address.service';
import { AddressDto } from '../../../shared/models/AddressDto';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  loginForm: FormGroup;
  addressdto:AddressDto=new AddressDto();
  message:any;
  constructor(
    private services: AddressService,
    private router: Router,
    public formBuilder: FormBuilder,
  //   private toaster:ToastrService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        addressStreet:["", [Validators.required,Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
        addressCity:  ["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
        addressDistrict:["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
        addressState: ["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
        addressPincode:["",[Validators.required,Validators.pattern("^[1-9][0-9]{5}")]],
        addressCountry: ["", [Validators.required,Validators.pattern("^(?=.*[a-zA-z])[a-zA-Z\\s]*$")]],
        //if(((this.feedback).match(/^ *$/)) !== null))

      });
  }
  submitted=false;
  Add()
   {
       
    this.submitted = true;
    
           // stop here if form is invalid
           if (this.loginForm.invalid) {
               return;}
  //   if (this.loginForm.invalid) {
  //     this.toaster.error("Please enter valid address");
  //     return;
  //   }
    this.addressdto.addressStreet=this.loginForm.value.addressStreet;
    this.addressdto.addressCity=this.loginForm.value.addressCity;
    this.addressdto.addressDistrict=this.loginForm.value.addressDistrict;
    this.addressdto.addressPincode=this.loginForm.value.addressPincode;
    this.addressdto.addressState=this.loginForm.value.addressState;
    this.addressdto.addressCountry=this.loginForm.value.addressCountry;
   this.addressdto.userEmail= JSON.parse(localStorage.getItem('userEmail'));
   //this.addressdto.userEmail="p@gmail.com";
    this.services.add(this.addressdto).subscribe(data => {
      this.message = data;
      console.log(this.message);
      this.router.navigateByUrl('/payment');
  });

}
get f() {
  return this.loginForm.controls;
}
}
