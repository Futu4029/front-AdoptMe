import { Component, OnInit } from '@angular/core';
import {AdoptionService} from "@service/adoption-service";
import {Adoption} from "@core/adoption-model";

@Component({
  selector: 'app-mis-adopciones',
  templateUrl: './mis-adopciones.component.html',
  styleUrls: ['./mis-adopciones.component.css']
})
export class MisAdopcionesComponent implements OnInit {

  misAdopciones: Adoption[] = [];
  misCandidatos: { [adoptionId: number]: any[] } = {};



  constructor(private adoptionService: AdoptionService) { }

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
          this.misCandidatos = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener los datos de los candidatos', error);
      }
    );
  }


}
