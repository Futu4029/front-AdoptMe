import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisAdopcionesRoutingModule } from './mis-adopciones-routing.module';
import { MisAdopcionesComponent } from './pages/mis-adopciones/mis-adopciones.component';


@NgModule({
  declarations: [
    MisAdopcionesComponent
  ],
  imports: [
    CommonModule,
    MisAdopcionesRoutingModule
  ]
})
export class MisAdopcionesModule { }
