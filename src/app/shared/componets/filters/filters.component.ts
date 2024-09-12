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
  ageFilterValue: string | undefined;
  sizeFilterValue: string | undefined;
  typeFilterValue: string | undefined;
  genderFilterValue: string | undefined;

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onFilterChange(filterCategory: any, filterValue: any): void {
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
    ).subscribe(response => {
      console.log('Datos filtrados recibidos:', response);
      this.filtersApplied.emit(response.data);  
    });
  }

  clearAllFilters(): void {
  
    this.clearFilters.emit();
    this.ageFilterValue = undefined;
    this.sizeFilterValue = undefined;
    this.typeFilterValue = undefined;
    this.genderFilterValue = undefined;
  }
}
