import { Component, OnInit } from '@angular/core';
import { AdoptionService } from "@service/adoption-service";
import { UserResponse } from "@core/adoption-model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user!: any;


  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.obtenerPerfilPorEmail(email); // Carga el perfil del candidato usando el email
    } else {
      this.obtenerPerfilUsuario(); // O muestra el perfil del usuario conectado
    }
  }


obtenerPerfilUsuario(): void {
  this.adoptionService.userProfile().subscribe(
    (response: any) => {
      if (response && response.data) {
        this.user = response.data;
        console.log('Datos del usuario:', this.user);
      }
    },
    (error) => {
      console.error('Error al obtener los datos del perfil', error);
    }
  );
}

obtenerPerfilPorEmail(email: string): void {
  this.adoptionService.obtenerPerfilPorEmail(email).subscribe(
    (response: any) => {
      if (response && response.data) {
        this.user = response.data;
        console.log('Datos del usuario:', this.user);
      }
    },
    (error) => {
      console.error('Error al obtener los datos del perfil', error);
    }
  );
}
}
