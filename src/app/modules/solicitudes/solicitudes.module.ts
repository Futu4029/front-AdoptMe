import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";  // Importa el routing

@NgModule({
  declarations: [
    SolicitudesComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    SolicitudesComponent
  ]
})
export class SolicitudesModule { }
