import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu : { defaultOptions: Array<any>} = {defaultOptions:[]};

  isSideBarMenuVisible: boolean = false;

  sidenavWidth: string= '';

  constructor() { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      { name: 'Home', icon: 'home', router: ['/'] },
      { name: 'Perfil', icon: 'person', router: ['/perfil'] },
      { name: 'Solicitudes', icon: 'mail', router: ['/solicitudes'] },
      { name: 'Crear Solicitud', icon: 'add_circle', router: ['/crearAdoption'] },
      { name: 'Mis adopciones', icon: 'pets', router: ['/misAdopciones'] },
    ];
  }

  toggleSideBarMenu(): void {
    this.isSideBarMenuVisible = !this.isSideBarMenuVisible;
  }

  updateSidenavWidth(width: number) {
    if (width >= 1200) {
      this.sidenavWidth = '250px';
    } else if (width >= 768) {
      this.sidenavWidth = '220px';
    } else {
      this.sidenavWidth = '180px';
    }
  }
}
