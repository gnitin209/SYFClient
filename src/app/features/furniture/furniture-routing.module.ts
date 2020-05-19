import { PostFurnitureComponent } from 'src/app/features/furniture/post-furniture/post-furniture.component';
import { HomeComponent } from './../../core/component/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path:"",component:PostFurnitureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FurnitureRoutingModule { }
