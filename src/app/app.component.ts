import { Component } from '@angular/core';
import {AuthService} from "@modules/auth/Service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adopt-me';

  constructor(public authService: AuthService) {}

}
