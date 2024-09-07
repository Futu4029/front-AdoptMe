import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasPageComponent } from './pages/mascotas-page/mascotas-page.component';

const routes: Routes = [
  {
    path: '',
    component: MascotasPageComponent,
    outlet: 'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule { }
