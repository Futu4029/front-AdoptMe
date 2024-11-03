import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {SharedModule} from "@shared/shared.module";
import {NavegationModule} from "./navegation/navegation.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {JwtInterceptor} from "./jwt.interceptor";
import {SwiperModule} from "swiper/angular";
import {MatListModule} from "@angular/material/list";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [ //TODO: DEclaraciones, componenetes, directivas
    AppComponent
  ],
    imports: [ //TODO: Solo se importan otros modules
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      SharedModule,
      NavegationModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatIconModule,
      MatExpansionModule,
      MatButtonToggleModule,
      MatSidenavModule,
      FormsModule,
      MatSnackBarModule,
      MatCardModule,
      MatButtonModule,
      SwiperModule,
      HammerModule,
      MatListModule,
      LeafletModule,
      MatSliderModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
