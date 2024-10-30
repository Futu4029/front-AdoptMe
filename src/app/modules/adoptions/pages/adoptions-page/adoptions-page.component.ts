import { Component, OnInit } from '@angular/core';
import { AdoptionService } from '@service/adoption-service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Pet } from "@core/adoption-model";
// @ts-ignore
import { PanGesture } from 'hammerjs';

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
  pets: { images: string[], name: string, age: number, desc: string, color: string, breed: string, size: string, gender: string, adoptionId: string }[] = [];
  currentIndex: number = 0;
  currentImageIndex: number = 0;
  currentState: string = 'current';
  showDescription: boolean = false;
  offset: number = 0;
  isSwiping: boolean = false;

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
    return this.pets[this.currentIndex]?.images[this.currentImageIndex] || ''; // Obtiene la imagen actual
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

  get currentID(): string {
    return this.pets[this.currentIndex]?.adoptionId || '';
  }

  get notFoundImage(): string {
    // Crear alias para la ruta.
    return "../../../../../assets/notfound.png";
  }
  get currentPetImages(): string[] {
    return this.pets[this.currentIndex]?.images || [];
  }

  onLike(): void {
    console.log("Quiero hacer match");
    const adoptionRequest = { 'adoptionId': this.currentID };
    console.log(adoptionRequest);

    this.adoptionService.applyToAdoption(adoptionRequest).subscribe(
      response => {
        console.log('Solicitud enviada correctamente', response);
        this.removeCurrentPet(); // Elimino la mascota luego de la solicitud exitosa
      },
      error => {
        console.error('Error al enviar la solicitud:', error);
      }
    );
  }

  onReject(): void {
    console.log("Lo dejo para otra familia");
    const adoptionRequest = { 'adoptionId': this.currentID };
    console.log(adoptionRequest);

    this.adoptionService.blackListAdoption(adoptionRequest).subscribe(
      response => {
        console.log('Rechazo enviado correctamente', response);
        this.removeCurrentPet(); // Elimino la mascota luego del rechazo exitoso
      },
      error => {
        console.error('Error al rechazar la solicitud:', error);
      }
    );
  }

  removeCurrentPet(): void {
    if (this.pets.length > 0) {
      this.pets.splice(this.currentIndex, 1); // Elimino la mascota actual
      // Ajusto el índice de la siguiente mascota
      if (this.currentIndex >= this.pets.length) {
        this.currentIndex = 0;
      }
    }
    // Si hay mascotas se avanza a la siguiente
    if (this.pets.length > 0) {
      this.currentState = 'next';
      setTimeout(() => {
        this.currentState = 'current';
      }, 500);
    }
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
        const petsData = responses.data.map((adoption: { id: string, pet: Pet }) => ({
          ...adoption.pet,
          adoptionId: adoption.id
        }));
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
      images: petData.images,
      name: petData.name,
      age: petData.age,
      desc: petData.description,
      color: petData.color,
      breed: petData.breed,
      size: petData.size,
      gender: petData.gender,
      adoptionId: petData.adoptionId
    }));
  }

  hasItems(): boolean {
    return this.pets && this.pets.length > 0;
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }

  onPreviousProfile(): void {
    this.currentState = 'prev';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex === 0) ? this.pets.length - 1 : this.currentIndex - 1;
      this.currentState = 'current';
    }, 500);
  }

  onNextProfile(): void {
    this.currentState = 'next';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.pets.length;
      this.currentState = 'current';
    }, 500);
  }

  onPanEnd(): void {
    this.isSwiping = false;
    if (this.offset > 50) {
      this.onNextProfile();
    } else if (this.offset < -50) {
      this.onPreviousProfile();
    } else {
      this.currentState = 'current';
    }

    this.offset = 0;
  }

  onPanMove(event: PanGesture): void {
    this.isSwiping = true; // Activar el estado de deslizamiento
    this.offset = event.deltaX; // Mueve el contenedor según el movimiento del dedo
  }

  nextImageInProfile(): void {
    const currentPet = this.pets[this.currentIndex];
    if (currentPet && currentPet.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % currentPet.images.length; // Cambia al siguiente índice
    }
  }

}
