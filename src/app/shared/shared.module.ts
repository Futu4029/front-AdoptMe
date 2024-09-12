import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './componets/side-bar/side-bar.component';
import { HeaderUserComponent } from './componets/header-user/header-user.component';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from './componets/filters/filters.component';
import {AdoptionService} from "@service/adoption-service";



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderUserComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SideBarComponent,
    HeaderUserComponent,
    FiltersComponent
  ],
  providers: [
    AdoptionService
  ]
})
export class SharedModule { }
