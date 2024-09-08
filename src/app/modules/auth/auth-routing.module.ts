import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Rutas login register se vinculan aqui
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
