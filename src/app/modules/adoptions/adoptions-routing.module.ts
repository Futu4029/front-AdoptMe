import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionsPageComponent } from '@modules/adoptions/pages/adoptions-page/adoptions-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdoptionsPageComponent,
    outlet: 'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoptionsRoutingModule { }
