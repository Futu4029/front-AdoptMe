import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdoptionsRoutingModule } from './adoptions-routing.module';
import { AdoptionsPageComponent } from '@modules/adoptions/pages/adoptions-page/adoptions-page.component';
import { SharedModule } from '@shared/shared.module';
import { AdoptionService } from '@service/adoption-service';



@NgModule({
  declarations: [
    AdoptionsPageComponent
  ],
  imports: [
    CommonModule,
    AdoptionsRoutingModule,
    SharedModule
  ],
  providers: [AdoptionService]
})
export class AdoptionsModule { }
