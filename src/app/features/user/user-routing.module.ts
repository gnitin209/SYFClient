import { HomeComponent } from './../../core/component/home/home.component';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from "src/app/features/order/address/address.component";


const routes: Routes = [
  {
    path:"home" , component:HomeComponent
    //path:"login" , component:HomeComponent
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
