import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderModule } from './../features/order/order.module';
import { FurnitureModule } from './../features/furniture/furniture.module';
import { UserModule } from './../features/user/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './component/about/about.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [ FooterComponent, HomeComponent, AboutComponent, ContactusComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    UserModule,
    FurnitureModule,
    FormsModule,
    OrderModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  exports:[FooterComponent,HomeComponent]
})
export class CoreModule { }
