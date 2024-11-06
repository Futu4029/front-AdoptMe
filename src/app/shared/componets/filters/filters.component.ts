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
  distanceFilterValue: number = 1; // Cambia a tipo number

  filters: { [key: string]: string | undefined | number } = {
    type: undefined,
    size: undefined,
    age: undefined,
    gender: undefined,
    distance: this.distanceFilterValue // Agrega el filtro de distancia como número
  };

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onFilterChange(filterCategory: string, filterValue: string | number | undefined): void {
    if (this.filters.hasOwnProperty(filterCategory)) {
      this.filters[filterCategory] = filterValue;
    } else {
      console.warn(`Unknown filter category: ${filterCategory}`);
    }
  }

  onDistanceChange(event: MatSliderChange): void {
    this.distanceFilterValue = event.value || 1;
    this.onFilterChange('distance', this.distanceFilterValue.toString()); // Convertir a string solo en esta llamada
    this.filters['distance'] = this.distanceFilterValue; // Almacenar como número en `filters`
  }


  private formatFilterValue(value: string | number | undefined): string | undefined {
    return value !== undefined ? value.toString() : undefined;
  }

  applyFilters(): void {
    this.adoptionService.searchFilteredAdoptions(
      this.formatFilterValue(this.filters.size),
      this.formatFilterValue(this.filters.age),
      this.formatFilterValue(this.filters.type),
      this.formatFilterValue(this.filters.gender),
      this.formatFilterValue(this.filters.distance)
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
      distance: 1 // Restablecer la distancia como número
    };
    // Restablecer valores de filtro
    this.typeFilterValue = undefined;
    this.genderFilterValue = undefined;
    this.ageFilterValue = undefined;
    this.sizeFilterValue = undefined;
    this.distanceFilterValue = 1; // Restablecer a valor inicial como número
  }
}
