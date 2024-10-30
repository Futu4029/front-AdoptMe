import { Component, OnInit } from '@angular/core';
import { AdoptionService } from "@service/adoption-service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user!: any;
  isEmailProfile: boolean = false; // Nueva propiedad para controlar la visibilidad del botón

  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.obtenerPerfilPorEmail(email); // Carga el perfil del candidato usando el email
      this.isEmailProfile = true; // Establece isEmailProfile en true
    } else {
      this.obtenerPerfilUsuario(); // O muestra el perfil del usuario conectado
      this.isEmailProfile = false; // Establece isEmailProfile en false
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

  volver(): void {
    this.router.navigate(['../misAdopciones']);
  }
}
