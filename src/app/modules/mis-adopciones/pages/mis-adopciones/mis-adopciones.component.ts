import { Component, OnInit } from '@angular/core';
import {AdoptionService} from "@service/adoption-service";
import {Adoption} from "@core/adoption-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mis-adopciones',
  templateUrl: './mis-adopciones.component.html',
  styleUrls: ['./mis-adopciones.component.css']
})
export class MisAdopcionesComponent implements OnInit {

  misAdopciones: Adoption[] = [];
  misCandidatos: { [adoptionId: string]: any[] } = {};
  mostrarCandidatos: { [adoptionId: string]: boolean } = {};


  constructor(private adoptionService: AdoptionService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerMisAdopciones();
  }

  obtenerMisAdopciones(): void {
    this.adoptionService.getAdoptionsById().subscribe(response => {
      if (response && response.data) {
        this.misAdopciones = response.data;
        console.log('Datos de mis adopciones:', this.misAdopciones);

        // Llamar a getApplicationsByAdoption para cada adopción
        this.misAdopciones.forEach(adoption => {
          this.getApplicationsByAdoption(adoption.id);
        });
      }
    }, error => {
      console.error('Error al obtener mis adopciones:', error);
    });
  }


  getApplicationsByAdoption(adoptionId: string): void {

    this.adoptionService.getApplicationsByAdoption(adoptionId).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.misCandidatos[adoptionId] = response.data;
          console.log('Candidatos para la adopción ' + adoptionId + ':', this.misCandidatos[adoptionId]);
        }
      },
      (error) => {
        console.error('Error al obtener los datos de los candidatos', error);
      }
    );
  }
  toggleCandidatos(adoptionId: string): void {
    this.mostrarCandidatos[adoptionId] = !this.mostrarCandidatos[adoptionId]; // Alternar visibilidad
  }

  acceptarcandidato(adoptionId: string, adopterId: string, status: Boolean): void {
    const request = {
      adoptionId,
      adopterId,
      status // "acepto" o "rechazo"
    };

    this.adoptionService.acceptOrRejectcandidato(request).subscribe(
      (response) => {
        console.log(`Candidato ${status === true ? 'aceptado' : 'rechazado'} exitosamente:`, response);
        this.obtenerMisAdopciones();
        this.misCandidatos[adoptionId] = this.misCandidatos[adoptionId].filter(candidato => candidato.userId === request.adoptionId);
      },
      (error) => {
        console.error(`Error al ${status === true ? 'aceptar' : 'rechazar'} al candidato:`, error);
      }
    );

  }
  rechazarCandidato(adoptionId: string, adopterId: string, status: Boolean): void {
    const request = {
      adoptionId,
      adopterId,
      status // "acepto" o "rechazo"
    };

    this.adoptionService.acceptOrRejectcandidato(request).subscribe(
      (response) => {
        console.log(`Candidato ${status === true ? 'aceptado' : 'rechazado'} exitosamente:`, response);
        this.obtenerMisAdopciones();
        if (status === false) {
          this.misCandidatos[adoptionId] = this.misCandidatos[adoptionId].filter(candidato => candidato.userId !== status);
          console.log('Candidatos actualizados:', this.misCandidatos[adoptionId]);
        }
      },
      (error) => {
        console.error(`Error al ${status === true ? 'aceptar' : 'rechazar'} al candidato:`, error);
      }
    );

  }

  obtenerPerfil(email: string): void {
    this.router.navigate(['/perfil', email]); // Navega a PerfilComponent con el email
  }

  getWhatsAppLink(candidato: any, adoption: any): string {
    const baseUrl = 'https://wa.me/';
    const telefono = '+54' + candidato?.user?.telefono || '';
    const message = `Hola, estoy interesado en saber más sobre tu perfil. Mi nombre es ${candidato?.user?.name || 'N/A'}. Te hablo por la adopción de ${adoption?.pet?.name || 'N/A'}.`;

    return `${baseUrl}${telefono}?text=${encodeURIComponent(message)}`;
  }

}



