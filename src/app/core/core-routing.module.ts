import { OrderHistoryComponent } from './../features/order/order-history/order-history.component';


//import * as path from 'path';
import { PaymentComponent } from "src/app/features/order/payment/payment.component";
import { AboutComponent } from './component/about/about.component';
import { ViewProductComponent } from './../features/furniture/view-product/view-product.component';
import { CartComponent } from './../features/order/cart/cart.component';
import { SignupComponent } from './../features/user/signup/signup.component';
import { SearchFurnitureComponent } from './../features/furniture/search-furniture/search-furniture.component';
import { PostFurnitureComponent } from "./../features/furniture/post-furniture/post-furniture.component";
import { SigninComponent } from "./../features/user/signin/signin.component";
import { HomeComponent } from "./component/home/home.component";
import { FooterComponent } from "./component/footer/footer.component";
import { HeaderComponent } from "./component/header/header.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactusComponent } from "./component/contactus/contactus.component"
import { AddressComponent } from "src/app/features/order/address/address.component";
// import { CardComponent } from "src/app/features/order/card/card.component";

const routes: Routes = [{path:'',redirectTo:"home",pathMatch:"full"},
  { path: "post", component: PostFurnitureComponent },
  { path: "orderHistory",component : OrderHistoryComponent},
  { path: "search/:value", component: SearchFurnitureComponent},
  {path:"login",component:SigninComponent},
  {path:"signup",component:SignupComponent},
  {path:"home",component:HomeComponent},
  {path:"cart",component:CartComponent},
  {path:"view/:value",component:ViewProductComponent},
  {path:"about",component:AboutComponent},
  {path:"contactus",component:ContactusComponent},
  {path:"a",component:AddressComponent},
  {path:"payment",component:PaymentComponent},
  // {path:"card",component:CardComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
