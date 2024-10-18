import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdoptionsPageComponent} from "@modules/adoptions/pages/adoptions-page/adoptions-page.component";
import {
  CrearAdoptionPageComponent
} from "@modules/crear-adopcion/pages/crear-adoption-page/crear-adoption-page.component";
import { MisAdopcionesComponent } from '@modules/mis-adopciones/pages/mis-adopciones/mis-adopciones.component';
import {AuthGuard} from "@modules/auth/Service/auth.guard";
import {PerfilComponent} from "@modules/perfil/pages/perfil/perfil.component";
import {SolicitudesComponent} from "@modules/solicitudes/pages/solicitudes/solicitudes.component";

//Declaracion de rutas del proyecto
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: '', // Relaciona directamente a la raiz localHost:4200
    component: AdoptionsPageComponent,
    loadChildren: () => import(`./modules/adoptions/adoptions.module`).then(m => m.AdoptionsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crearAdoption',
    component: CrearAdoptionPageComponent,
    loadChildren: () => import(`./modules/crear-adopcion/crear-adopcion.module`).then(m => m.CrearAdopcionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'misAdopciones',
    component: MisAdopcionesComponent,
    loadChildren: () => import(`./modules/mis-adopciones/mis-adopciones.module`).then(m => m.MisAdopcionesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    loadChildren: () => import(`./modules/perfil/perfil.module`).then(m => m.PerfilModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent,
    loadChildren: () => import('./modules/solicitudes/solicitudes.module').then(m => m.SolicitudesModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
