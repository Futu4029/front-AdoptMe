import { Component, OnInit } from '@angular/core';
import { AdoptionService } from '@service/adoption-service';
import {trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: 'app-adoptions-page',
  templateUrl: './adoptions-page.component.html',
  styleUrls: ['./adoptions-page.component.css'],
  animations: [
    trigger('swipeAnimation', [
      state('current', style({ opacity: 1, transform: 'translateX(0) scale(1)', filter: 'blur(0)' })),
      state('next', style({ opacity: 0, transform: 'translateX(100%) scale(0.95)', filter: 'blur(4px)' })),
      state('prev', style({ opacity: 0, transform: 'translateX(-100%) scale(0.95)', filter: 'blur(4px)' })),
      transition('current => next', [
        animate('0.5s ease-out')
      ]),
      transition('current => prev', [
        animate('0.5s ease-out')
      ]),
      transition('next => current', [
        animate('0.5s ease-in')
      ]),
      transition('prev => current', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class AdoptionsPageComponent implements OnInit {
  pets: { image: string, name: string, age: number, desc: string, color:string, breed: string, size: string, gender: string }[] = [];
  currentIndex: number = 0;
  currentState: string = 'current';
  showDescription: boolean = false;

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.fetchAllAdoptions();
  }

  get currentcolor(): string {
    return this.pets[this.currentIndex]?.color || '';
  }

  get currentbreed(): string {
    return this.pets[this.currentIndex]?.breed || '';
  }

  get currentsize(): string {
    return this.pets[this.currentIndex]?.size || '';
  }

  get currentgender(): string {
    return this.pets[this.currentIndex]?.gender || '';
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

  get notFoundImage(): string {
    //Crear alias para la ruta.
    return "../../../../../assets/notfound.png";
  }

  onLike(): void {
    console.log("Quiero hacer match");

    const adoptionId = localStorage.getItem('adoptionId');
    const userId = localStorage.getItem('userId');

    if (adoptionId && userId) {

      const formData = new FormData();
      formData.append('adoptionId', adoptionId);
      formData.append('userId', userId);


      this.adoptionService.applyToAdoption(formData).subscribe(
        response => {
          console.log('Solicitud enviada correctamente', response);
        },
        error => {
          console.error('Error al enviar la solicitud:', error);
        }
      );
    } else {
      console.error('No se encontraron los datos necesarios en el LocalStorage');
    }

    this.nextImage();
  }


  onReject(): void {
    console.log("Lo dejo para otra familia");
    this.nextImage();
  }

  nextImage(): void {
    this.currentState = 'next';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.pets.length;
      this.currentState = 'current';
    }, 500);
  }

  fetchAllAdoptions(): void {
    this.adoptionService.searchFilteredAdoptions().subscribe(
      (responses: any) => {
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
  }

  onClearFilters(): void {
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
      desc: petData.description,
      color: petData.color,
      breed: petData.breed,
      size: petData.size,
      gender: petData.gender

    }));
  }

  hasItems(): boolean {
    return this.pets && this.pets.length > 0;
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }

  onPreviousProfile(): void {
    this.currentState = 'prev'; // Cambiar al estado de 'prev'
    setTimeout(() => {
      this.currentIndex = (this.currentIndex === 0) ? this.pets.length - 1 : this.currentIndex - 1;
      this.currentState = 'current'; // Regresar al estado 'current'
    }, 500);
  }

  onNextProfile(): void {
    this.nextImage();
  }
}
