import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { AdoptionService } from '@service/adoption-service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() filtersApplied = new EventEmitter<any[]>();
  @Output() clearFilters = new EventEmitter<void>();

  isMenuVisible: boolean = false;

  // Declara los valores de filtro
  typeFilterValue: string | undefined;
  genderFilterValue: string | undefined;
  ageFilterValue: string | undefined;
  sizeFilterValue: string | undefined;
  distanceFilterValue: string = "1"; // Mantener como string

  filters: { [key: string]: string | undefined } = {
    type: undefined,
    size: undefined,
    age: undefined,
    gender: undefined,
    distance: this.distanceFilterValue // Agrega el filtro de distancia
  };

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onFilterChange(filterCategory: string, filterValue: string): void {
    if (this.filters.hasOwnProperty(filterCategory)) {
      this.filters[filterCategory] = filterValue;
    } else {
      console.warn(`Unknown filter category: ${filterCategory}`);
    }
  }

  onDistanceChange(event: any): void {
    this.distanceFilterValue = event.value?.toString() || "1"; // Convertir a string
    this.onFilterChange('distance', this.distanceFilterValue);
  }

  applyFilters(): void {
    this.adoptionService.searchFilteredAdoptions(
      this.filters.size,
      this.filters.age,
      this.filters.type,
      this.filters.gender,
      this.filters.distance // Pasar el valor de distancia al servicio
    ).subscribe({
      next: (response) => {
        console.log('Datos filtrados recibidos:', response);
        this.filtersApplied.emit(response.data);
      },
      error: (err) => {
        console.error('Error fetching filtered adoptions:', err);
      }
    });
  }

  clearAllFilters(): void {
    this.clearFilters.emit();
    this.filters = {
      type: undefined,
      size: undefined,
      age: undefined,
      gender: undefined,
      distance: this.distanceFilterValue // Restablecer la distancia
    };
    // Restablecer valores de filtro
    this.typeFilterValue = undefined;
    this.genderFilterValue = undefined;
    this.ageFilterValue = undefined;
    this.sizeFilterValue = undefined;
    this.distanceFilterValue = "1"; // Restablecer a valor inicial
  }
}
