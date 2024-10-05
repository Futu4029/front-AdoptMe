import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdoptionsRoutingModule } from './adoptions-routing.module';
import { AdoptionsPageComponent } from '@modules/adoptions/pages/adoptions-page/adoptions-page.component';
import { SharedModule } from '@shared/shared.module';
import { AdoptionService } from '@service/adoption-service';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
//import {TokenInterceptor} from "@service/token-interceptor.service";



@NgModule({
  declarations: [
    AdoptionsPageComponent
  ],
  imports: [
    CommonModule,
    AdoptionsRoutingModule,
    SharedModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [AdoptionService
    //,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class AdoptionsModule { }
