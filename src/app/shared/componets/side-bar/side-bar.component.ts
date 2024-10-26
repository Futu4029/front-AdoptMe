import { Component, OnInit } from '@angular/core';
import {AuthService} from "@modules/auth/Service/auth.service";
import {AdoptionService} from "@service/adoption-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu : { defaultOptions: Array<any>} = {defaultOptions:[]};

  isSideBarMenuVisible: boolean = false;

  sidenavWidth: string= '';

  constructor(private authService: AuthService,  private adoptionService: AdoptionService, private router: Router) { }

  userProfile: any;

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      { name: 'Home', icon: 'home', router: ['/'] },
     // { name: 'Perfil', icon: 'person', router: ['/perfil'] },
      { name: 'Solicitudes', icon: 'mail', router: ['/solicitudes'] },
      { name: 'Crear Adopcion', icon: 'add_circle', router: ['/crearAdoption'] },
      { name: 'Mis adopciones', icon: 'pets', router: ['/misAdopciones'] },
    ];
    this.loadUserProfile();
  }

  toggleSideBarMenu(): void {
    this.isSideBarMenuVisible = !this.isSideBarMenuVisible;

  }

  logout() {
    this.authService.logout();
  }

  loadUserProfile(): void {
    this.adoptionService.userProfile().subscribe((profile) => {
      this.userProfile = profile; // Asigna el perfil del usuario a la variable
      console.log(this.userProfile);
    });
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }


}
