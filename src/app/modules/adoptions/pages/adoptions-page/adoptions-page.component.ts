import { Component, OnInit } from '@angular/core';
import { AdoptionService } from '@service/adoption-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-adoptions-page',
  templateUrl: './adoptions-page.component.html',
  styleUrls: ['./adoptions-page.component.css']
})

export class AdoptionsPageComponent implements OnInit {
  pets: { image: string, name: string, age: number, desc: string }[] = [

  ];

  currentIndex: number = 0;

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    console.log('Initial pets array:', this.pets);
    this.fetchAllAdoptions();
  }

  get currentImage(): string {
    return this.pets[this.currentIndex]?.image || '';
  }

  get currentName(): string {
    return this.pets[this.currentIndex]?.name || '';
  }

  get currentAge(): number {
    return this.pets[this.currentIndex]?.age || 0;
  }

  get currentDesc(): string {
    return this.pets[this.currentIndex]?.desc || '';
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

      this.adoptionService.searchFilteredAdoptions()
    .subscribe(
      (responses: any) => {
        console.log(responses);
        const petsData = responses.data.map((adoption: { pet: any; }) => adoption.pet).filter((pet: any) => pet);

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
      image: petData.image,
      name: petData.name,
      age: petData.age,
      desc:petData.description
    }));

    console.log('Updated pets array:', this.pets);
  }
}
