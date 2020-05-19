import { ToastrModule } from 'ngx-toastr';

import { FurnitureModule } from "./features/furniture/furniture.module";
import { SearchFurnitureComponent } from "./features/furniture/search-furniture/search-furniture.component";
import { UserService } from "./shared/services/user.service";
import { HeaderComponent } from "./core/component/header/header.component";
import { CoreModule } from "./core/core.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PostFurnitureComponent } from "src/app/features/furniture/post-furniture/post-furniture.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider
 } from "angularx-social-login";



  
 // const google_auth_client_id:string="887807370090-jn4e0pq0lc407l0jti63a8fmq0u5rqqh.apps.googleusercontent.com"
 // let config=new AuthServiceConfig([{
 // id:GoogleLoginProvider.PROVIDER_ID,
 // provider:new GoogleLoginProvider(google_auth_client_id)
 // }])
 const config = new AuthServiceConfig([
  {
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider("1078137247508-ohbof4mqc61mv3l9uvhtoin9unapr3cf.apps.googleusercontent.com")
  },
  {
  id: FacebookLoginProvider.PROVIDER_ID,
  provider: new FacebookLoginProvider('209578683477561')
  }
  ]);
  export function provideConfig() {
  return config;
  }
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    ToastrModule.forRoot()
 ,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [UserService,
  {
  provide: AuthServiceConfig,
  useFactory: provideConfig
  }
  ],
   bootstrap: [AppComponent]
 })
 
export class AppModule {}