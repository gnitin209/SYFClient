import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostFurnitureComponent } from 'src/app/features/furniture/post-furniture/post-furniture.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FurnitureRoutingModule } from "./furniture-routing.module";
import { FilterComponent } from "./filter/filter.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { SearchFurnitureComponent } from "./search-furniture/search-furniture.component";
import { ToastrModule } from 'ngx-toastr';
import { ViewProductComponent } from './view-product/view-product.component';


@NgModule({
  declarations: [
    FilterComponent,
    SearchFurnitureComponent,
    ViewProductComponent,
    PostFurnitureComponent
  ],

  imports: [
    CommonModule,
    FurnitureRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgbModule,
  ]
})
export class FurnitureModule {}
