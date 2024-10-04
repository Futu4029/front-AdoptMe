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

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.obtenerMisAdopciones();
  }

  obtenerMisAdopciones(): void {

    //aca seria el email de la persona logeada algo asi como getAdoptionsByUserEmail

    this.adoptionService.getAdoptionById("1").subscribe(response => {
      if (response && response.data) {
        this.misAdopciones = response.data; // Asignar las adopciones a la lista
      }
    }, error => {
      console.error('Error al obtener mis adopciones:', error);
    });
  }
}
