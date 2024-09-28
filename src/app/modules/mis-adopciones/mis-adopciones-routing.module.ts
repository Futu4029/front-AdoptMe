import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisAdopcionesComponent } from './pages/mis-adopciones/mis-adopciones.component';

const routes: Routes = [  {
  path: '',
  component: MisAdopcionesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisAdopcionesRoutingModule { }
