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

  // Array de objetos con imagen, nombre y edad
  pets: { src: string, name: string, age: number }[] = [
    { src: 'assets/Mila.jpeg', name: '', age: 0 },
    { src: 'assets/CALU.jpeg', name: '', age: 0 },
    { src: 'assets/Boni.jpeg', name: '', age: 0 }
  ];

  currentIndex: number = 0;

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.fetchAdoptionById("1");
    console.log('Initial pets array:', this.pets);
  }


  get currentImage(): string {
    return this.pets[this.currentIndex]?.src || '';
  }


  get currentName(): string {
    return this.pets[this.currentIndex]?.name || '';
  }


  get currentAge(): number {
    return this.pets[this.currentIndex]?.age || 0;
  }


  onLike(): void {
    console.log("Quiero hacer match");
    this.nextImage(); 
  }

  onReject(): void {
    console.log("Lo dejo para otra familia");
    this.nextImage(); 
  }


  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.pets.length;
  }

fetchAdoptionById(id: string): void {
  this.adoptionService.getAdoptionById(id).subscribe(
    (data: any[]) => {

      this.pets = this.pets.map((pet, index) => {
        if (data[index]) {
          const petData = data[index].pet;
          return {
            src: pet.src, 
            name: petData.name,
            age: petData.age,
            description: petData.description
          };
        }
        return pet;
      });

      console.log('Updated pets array:', this.pets);
    },
    (error) => {
      console.error('Error fetching adoption:', error);
    }
  );
}
}
