import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';  // Importa el routing

@NgModule({
  declarations: [
    SolicitudesComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule
  ],
  exports: [
    SolicitudesComponent
  ]
})
export class SolicitudesModule { }
