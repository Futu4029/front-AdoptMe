import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import {MatCardModule} from "@angular/material/card";  // Importa el routing

@NgModule({
  declarations: [
    SolicitudesComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    MatCardModule
  ],
  exports: [
    SolicitudesComponent
  ]
})
export class SolicitudesModule { }
