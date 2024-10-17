import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {RegisterComponent} from "@modules/auth/register/register.component";

//Rutas login register se vinculan aqui
const routes: Routes = [
  {
    path:'login',
    component: LoginPageComponent
  },
  { path: 'register',
    component: RegisterComponent },
  {
    path:'**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
