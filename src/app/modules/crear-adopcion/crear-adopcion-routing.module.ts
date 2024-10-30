import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CrearAdoptionPageComponent
} from "@modules/crear-adopcion/pages/crear-adoption-page/crear-adoption-page.component";

const routes: Routes = [
  {
    path: '',
    component: CrearAdoptionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearAdopcionRoutingModule { }
