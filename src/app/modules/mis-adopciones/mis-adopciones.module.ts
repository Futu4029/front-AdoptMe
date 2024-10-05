import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisAdopcionesRoutingModule } from './mis-adopciones-routing.module';
import { MisAdopcionesComponent } from './pages/mis-adopciones/mis-adopciones.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    MisAdopcionesComponent
  ],
  imports: [
    CommonModule,
    MisAdopcionesRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MisAdopcionesModule { }
