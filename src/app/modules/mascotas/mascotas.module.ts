import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas-routing.module';
import { MascotasPageComponent } from './pages/mascotas-page/mascotas-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    MascotasPageComponent
  ],
  imports: [
    CommonModule,
    MascotasRoutingModule,
    SharedModule
  ]
})
export class MascotasModule { }
