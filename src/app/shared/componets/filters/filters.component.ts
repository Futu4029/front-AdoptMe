import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  // Declare filter values
  typeFilterValue: string | undefined;
  genderFilterValue: string | undefined;
  ageFilterValue: string | undefined;
  sizeFilterValue: string | undefined;

  filters: { [key: string]: string | undefined } = {
    type: undefined,
    size: undefined,
    age: undefined,
    gender: undefined
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

  applyFilters(): void {
    this.adoptionService.searchFilteredAdoptions(
      this.filters.size,
      this.filters.age,
      this.filters.type,
      this.filters.gender
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
      gender: undefined
    };
    // Reset filter values
    this.typeFilterValue = undefined;
    this.genderFilterValue = undefined;
    this.ageFilterValue = undefined;
    this.sizeFilterValue = undefined;
  }
}
