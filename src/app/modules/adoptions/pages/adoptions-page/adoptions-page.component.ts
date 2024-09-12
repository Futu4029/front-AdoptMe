import { Component, OnInit } from '@angular/core';
import { AdoptionService } from '@service/adoption-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-adoptions-page',
  templateUrl: './adoptions-page.component.html',
  styleUrls: ['./adoptions-page.component.css']
})

export class AdoptionsPageComponent implements OnInit {
  pets: { src: string, name: string, age: number }[] = [
    { src: '', name: '', age: 0 },
    { src: '', name: '', age: 0 },
    { src: '', name: '', age: 0 }
  ];

  //Lo hacemos asi hasta q en la base se puedan subir fotos
  private getImageForPet(name: string): string {
    const imageMap: { [key: string]: string } = {
      'Mila': 'assets/Mila.jpeg',
      'Calu': 'assets/CALU.jpeg',
      'Boni': 'assets/Boni.jpeg'
    };
  
    return imageMap[name] || 'assets/default.jpeg';
  }

  currentIndex: number = 0;

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    console.log('Initial pets array:', this.pets);
    this.fetchAllAdoptions();
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

  fetchAllAdoptions(): void {
    forkJoin([
      this.adoptionService.getAdoptionById("1"),
      this.adoptionService.getAdoptionById("2"),
      this.adoptionService.getAdoptionById("3")
    ]).subscribe(
      (responses: any[]) => {
        const petsData = responses.map((reply) => reply.data[0]?.pet).filter(pet => pet); 
        this.updatePetsList(petsData);      
      },
      (error) => {
        console.error('Error fetching adoptions:', error);
      }
    );
  }

  onFiltersApplied(filteredPets: any[]): void {
    const petsData = filteredPets.map((filteredPet) => filteredPet.pet); 
    this.updatePetsList(petsData);
    this.currentIndex = 0; 
    console.log('Updated pets array after filtering:', this.pets);
  }

  onClearFilters(): void {
    // Volver a cargar todas las adopciones al borrar los filtros
    this.fetchAllAdoptions();
  }

  private updatePetsList(petsData: any[]): void {
    if (!petsData.length) {
      this.pets = [];
      return;
    }
  
    this.pets = petsData.map((petData) => ({
      src: this.getImageForPet(petData.name), 
      name: petData.name,
      age: petData.age
    }));
  
    console.log('Updated pets array:', this.pets); 
  }
}
