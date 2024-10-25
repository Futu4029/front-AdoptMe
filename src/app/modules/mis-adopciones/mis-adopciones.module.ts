import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisAdopcionesRoutingModule } from './mis-adopciones-routing.module';
import { MisAdopcionesComponent } from './pages/mis-adopciones/mis-adopciones.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    MisAdopcionesComponent
  ],
  imports: [
    CommonModule,
    MisAdopcionesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MisAdopcionesModule { }
