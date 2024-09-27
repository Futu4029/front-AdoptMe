import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu : { defaultOptions: Array<any>} = {defaultOptions:[]};

  isSideBarMenuVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      { name: 'Perfil', icon: 'fas fa-user', router: ['/', 'Perfil'] },
      { name: 'Quiero Adoptar', icon: 'fas fa-heart', router: ['/', 'adopciones'] },
      { name: 'Solicitudes', icon: 'fas fa-book', router: ['/', 'Solicitudes'] },
      { name: 'Crear Solicitud', icon: 'fas fa-book', router: ['/', 'crearAdoption'] },
    ];
  }

  toggleSideBarMenu(): void {
    this.isSideBarMenuVisible = !this.isSideBarMenuVisible;
  }
}
