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
    //const email = localStorage.getItem('userEmail');

      this.adoptionService.getAdoptionByemail("test.user@gmail.com").subscribe(response => {
        if (response && response.data) {
          this.misAdopciones = response.data;
        }
      }, error => {
        console.error('Error al obtener mis adopciones:', error);
      });
  }
}
