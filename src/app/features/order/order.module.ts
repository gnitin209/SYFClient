import { NgxSpinnerModule } from 'ngx-spinner';
// import { CardComponent } from "src/app/features/order/card/card.component";

import { PaymentComponent } from "src/app/features/order/payment/payment.component";
import { UserRoutingModule } from '../user/user-routing.module';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CartComponent } from './cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { AddressComponent } from "src/app/features/order/address/address.component";
import { OrderHistoryComponent } from './order-history/order-history.component';


@NgModule({
  declarations: [CartComponent,AddressComponent,PaymentComponent, OrderHistoryComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ToastrModule.forRoot(),
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule
  ]
})
export class OrderModule { }
