import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {PetAge, PetSize, PetType} from "@core/adoption-model";
import {AdoptionService} from "@service/adoption-service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

 isMenuVisible: boolean = false;  // Controla si el menú es visible
  ageFilterValue: string | undefined;
  sizeFilterValue: string | undefined;
  typeFilterValue: string | undefined;
  genderFilterValue: string | undefined;

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
  }

  // Cambia la visibilidad del menú
  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onFilterChange(filterCategory: any, filterValue: any): void {
    // Lógica para manejar cambios en los filtros
    console.log(filterValue);
    switch (filterCategory) {
      case 'type':
        this.typeFilterValue = filterValue;
        break;
      case 'size':
        this.sizeFilterValue = filterValue;
        break;
      case 'age':
        this.ageFilterValue = filterValue;
        break;
      case 'gender':
        this.genderFilterValue = filterValue;
        break;
      default:
        console.warn(`Unknown filter category: ${filterCategory}`);
        break;
    }
  }

  applyFilters(): void {
    this.adoptionService.searchFilteredAdoptions(
      this.sizeFilterValue,
      this.ageFilterValue,
      this.typeFilterValue,
      this.genderFilterValue
    ).subscribe(data => {
      console.log(`Esto imprime: ${data}`); 
    });
  }

}

