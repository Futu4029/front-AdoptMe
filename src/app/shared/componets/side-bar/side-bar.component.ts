import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar', //NOMBRE PARA IMPLEMENTAR ESE COMPONENTE
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu : { defaultOptions: Array<any>, accessLink: Array<any> 
  } = {defaultOptions:[], accessLink : []}
 
  constructor() { }

  ngOnInit(): void { // Ciclo que se usa para hacer llamados de servicios o peticiones a URL
    this.mainMenu.defaultOptions =[
      { name: 'Home',
       icon: 'uil-estate',
       router: ['/']
      },
      { name: 'Perfil',
       icon: 'uil-user',
       router: ['/','Perfil']
      },
      { name: 'Quiero Adoptar',
        icon: 'uil-fire',
        router: ['/','mascotas']
       },
      { name: 'Solicitudes',
       icon: 'uil-bars',
       router: ['/','Solicitudes']
      },
     
       ]

  }

}