import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {PetAge, PetSize, PetType} from "@core/adoption-model";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

 isMenuVisible: boolean = false;  // Controla si el menú es visible
  ageFilterValue!: PetAge | null;
  sizeFilterValue!: PetSize | null;
  typeFilterValue!: PetType | null;


  constructor() { }

  ngOnInit(): void {

  }

  // Cambia la visibilidad del menú
  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onFilterChange(filterCategory: string, filterValue: string): void {
    // Lógica para manejar cambios en los filtros
    console.log(`Filtro cambiado: ${filterCategory} - ${filterValue}`);
  }

  applyFilters(): void {
    // Lógica para aplicar los filtros seleccionados
    console.log('Filtros aplicados');
  }
}

