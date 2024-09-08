import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar', //NOMBRE PARA IMPLEMENTAR ESE COMPONENTE
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu : { defaultOptions: Array<any>} = {defaultOptions:[]}
 
  isCollapsed: boolean = false; // Variable para controlar el estado del menú

  constructor() { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      { name: 'Home', icon: 'uil-estate', router: ['/'] },
      { name: 'Perfil', icon: 'uil-user', router: ['/', 'Perfil'] },
      { name: 'Quiero Adoptar', icon: 'uil-heart', router: ['/', 'mascotas'] },
      { name: 'Solicitudes', icon: 'uil-book', router: ['/', 'Solicitudes'] },
    ];
  }

  // Función para esconder/mostrar el menú
  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}