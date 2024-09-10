import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

 isMenuVisible: boolean = false;  // Controla si el menú es visible

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

