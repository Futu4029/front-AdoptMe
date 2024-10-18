import { Component, OnInit } from '@angular/core';
import {AuthService} from "@modules/auth/Service/auth.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu : { defaultOptions: Array<any>} = {defaultOptions:[]};

  isSideBarMenuVisible: boolean = false;

  sidenavWidth: string= '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      { name: 'Home', icon: 'home', router: ['/'] },
      { name: 'Perfil', icon: 'person', router: ['/perfil'] },
      { name: 'Solicitudes', icon: 'mail', router: ['/solicitudes'] },
      { name: 'Crear Adopcion', icon: 'add_circle', router: ['/crearAdoption'] },
      { name: 'Mis adopciones', icon: 'pets', router: ['/misAdopciones'] },
    ];
  }

  toggleSideBarMenu(): void {
    this.isSideBarMenuVisible = !this.isSideBarMenuVisible;
  }


  logout() {
    this.authService.logout();
  }
}
