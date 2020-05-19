import { HomeComponent } from '../../core/component/home/home.component';

import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from "src/app/features/order/address/address.component";


const routes: Routes = [
 
    {path:"adress",component:AddressComponent},
    {   path:"home" , component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
