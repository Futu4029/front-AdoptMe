import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path:'adopciones',
  loadChildren:( ) => import('@modules/adoptions/adoptions.module').then(m =>m.AdoptionsModule)
},
  {
    path:'crearAdoption',
    loadChildren:( ) => import('@modules/crear-adopcion/crear-adopcion.module').then(m =>m.CrearAdopcionModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
