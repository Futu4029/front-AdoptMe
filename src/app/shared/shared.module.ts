import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './componets/side-bar/side-bar.component';
import { HeaderUserComponent } from './componets/header-user/header-user.component';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from './componets/filters/filters.component';
import {AdoptionService} from "@service/adoption-service";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from "@angular/forms";
import {AuthService} from "@modules/auth/Service/auth.service";
import {MatMenuModule} from "@angular/material/menu";
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderUserComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSidenavModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatSliderModule
  ],
  exports:[
    SideBarComponent,
    HeaderUserComponent,
    FiltersComponent
  ],
  providers: [
    AdoptionService,
    AuthService
  ]

})
export class SharedModule { }
