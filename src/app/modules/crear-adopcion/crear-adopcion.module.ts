import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAdopcionRoutingModule } from './crear-adopcion-routing.module';
import { CrearAdoptionPageComponent } from './pages/crear-adoption-page/crear-adoption-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {OverlayModule} from "@angular/cdk/overlay";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {SharedModule} from "@shared/shared.module";
import {AdoptionService} from "@service/adoption-service";
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    CrearAdoptionPageComponent
  ],
  imports: [
    CommonModule,
    CrearAdopcionRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    OverlayModule,
    MatButtonModule,
    ScrollingModule,
    MatDialogModule,
    MatMenuModule,
    SharedModule,
    FormsModule,
    MatSnackBarModule

  ],
  providers: [AdoptionService]
})
export class CrearAdopcionModule { }
