import { Component, OnInit } from '@angular/core';
import {AdoptionService} from "@service/adoption-service";

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  misSolicitudes: any = [];

  constructor(private adoptionService: AdoptionService) {
  }

  ngOnInit(): void {
    this.getApplicationsByUserId();
  }

  getApplicationsByUserId(): void {
    this.adoptionService.getApplicationsByUserId().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.misSolicitudes = response.data;
          console.log('Datos de las solicitudes:', this.misSolicitudes);
        }
      },
      (error) => {
        console.error('Error al obtener los datos de las solicitudes', error);
      }
    );
  }

}
