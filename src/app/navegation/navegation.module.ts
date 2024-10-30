import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "@shared/shared.module";
import { NavigationComponent } from './navigation/navigation.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    NavigationComponent
  ],
})
export class NavegationModule { }
