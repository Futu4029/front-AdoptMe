import { Component, OnInit } from '@angular/core';
import { AdoptionService } from "@service/adoption-service";
import { UserResponse } from "@core/adoption-model";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user!: any;


  constructor(private adoptionService: AdoptionService) {
  }

  ngOnInit(): void {
    this.obtenerPerfilUsuario();
  }

  obtenerPerfilUsuario(): void {
    this.adoptionService.userProfile().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.user = response.data; // Asigna el objeto data a user
          console.log('Datos del usuario:', this.user);
        }
      },
      (error) => {
        console.error('Error al obtener los datos del perfil', error);
      }
    );
  }
}
