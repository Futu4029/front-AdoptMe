import { Component, OnInit } from '@angular/core';
import { AdoptionService } from '@service/adoption-service';
import { Adoption } from '@core/adoption-model';

@Component({
  selector: 'app-mascotas-page',
  templateUrl: './mascotas-page.component.html',
  styleUrls: ['./mascotas-page.component.css']
})
export class MascotasPageComponent implements OnInit {
  adoption: Adoption | null = null;

  // Array de imágenes de los perros candidatos
  images: string[] = [
    'assets/CALU.jpeg',
    'assets/Mila.jpeg',
    'assets/Boni.jpeg',
    'assets/Tomy.jpeg',
    'assets/Beni.jpeg',
    'assets/Aura.jpeg'
  ];

  // Índice actual de la imagen que se está mostrando
  currentIndex: number = 0;

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.fetchAdoptionById("1");
    console.log(this.adoption);
  }

  // Método que retorna la imagen actual
  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  // Método para manejar el evento de "Me Gusta"
  onLike(): void {
    console.log("Quiero hacer match");
    this.nextImage(); // Cambia a la siguiente imagen
  }

  // Método para manejar el evento de "Rechazar"
  onReject(): void {
    console.log("Lo dejo para otra familia");
    this.nextImage(); // Cambia a la siguiente imagen
  }

  // Método que cambia a la siguiente imagen en el carrusel
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  fetchAdoptionById(id: string): void {
    this.adoptionService.getAdoptionById(id).subscribe(
      (data: Adoption) => {
        this.adoption = data;
        console.log('Adoption data:', this.adoption);
      },
      (error) => {
        console.error('Error fetching adoption:', error);
      }
    );
  }
}
