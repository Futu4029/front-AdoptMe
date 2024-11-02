import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionsPageComponent } from './adoptions-page.component';
import {AdoptionService} from "@service/adoption-service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {of, throwError} from "rxjs";
import {SharedModule} from "@shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {FiltersComponent} from "@shared/componets/filters/filters.component";
import {By} from "@angular/platform-browser";

describe('AdoptionsPageComponent', () => {
  let component: AdoptionsPageComponent;
  let fixture: ComponentFixture<AdoptionsPageComponent>;
  let adoptionServiceSpy: jasmine.SpyObj<AdoptionService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const adoptionServiceMock = jasmine.createSpyObj('AdoptionService', [
      'applyToAdoption',
      'blackListAdoption',
      'searchFilteredAdoptions'
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AdoptionsPageComponent, FiltersComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SharedModule,
        BrowserAnimationsModule,
        MatCardModule
      ],
      providers: [
        { provide: AdoptionService, useValue: adoptionServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    adoptionServiceSpy = TestBed.inject(AdoptionService) as jasmine.SpyObj<AdoptionService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    adoptionServiceSpy.searchFilteredAdoptions.and.returnValue(of([]));
    adoptionServiceSpy.applyToAdoption.and.returnValue(of([]));
    adoptionServiceSpy.blackListAdoption.and.returnValue(of([]));

    fixture = TestBed.createComponent(AdoptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test Unitarios
  it('should call searchFilteredAdoptions and set adoptions data on success', () => {
    const mockAdoptions = {
      data: [
        {
          id: "adoption123",
          pet: {
            images: [],
            name: "Rex",
            age: 3,
            description: "Un perro muy juguetón y amigable.",
            color: "Marrón claro",
            breed: "Labrador",
            size: "Grande",
            gender: "Macho"
          }
        }
      ]
    };

    const expectedPetsData = [
      {
        images: [],
        name: "Rex",
        age: 3,
        desc: "Un perro muy juguetón y amigable.",
        color: "Marrón claro",
        breed: "Labrador",
        size: "Grande",
        gender: "Macho",
        adoptionId: "adoption123"
      }
    ];

    adoptionServiceSpy.searchFilteredAdoptions.and.returnValue(of(mockAdoptions));

    component.fetchAllAdoptions();

    expect(adoptionServiceSpy.searchFilteredAdoptions).toHaveBeenCalled(); // Verifica que el servicio fue llamado
    expect(component.pets).toEqual(expectedPetsData); // Verifica que los datos de adopciones se establecieron correctamente
  });

  it('should call applyToAdoption with adoptionId on successful request', () => {
    component.pets = [{
      images: ['img1.jpg'],
      name: 'Mila',
      age: 2,
      desc: 'Soy Mila',
      color: 'Marron',
      breed: 'Salchicha',
      size: 'Chico',
      gender: 'Hembra',
      adoptionId: 'adoption123'
    }];
    component.currentIndex = 0;
    component.onLike();

    expect(adoptionServiceSpy.applyToAdoption).toHaveBeenCalledWith({
      adoptionId: 'adoption123'
    });
  });

  it('should call blackList on successful request with adoptionId', () => {
    component.pets = [{
      images: ['img1.jpg'],
      name: 'Mila',
      age: 2,
      desc: 'Soy Mila',
      color: 'Marron',
      breed: 'Salchicha',
      size: 'Chico',
      gender: 'Hembra',
      adoptionId: 'adoption123'
    }];
    component.currentIndex = 0;
    component.onReject();

    expect(adoptionServiceSpy.blackListAdoption).toHaveBeenCalledWith({
      adoptionId: 'adoption123'
    });
  });

  it('should call showReaction with "like" when onLike is called', () => {
    const showReactionSpy = spyOn(component as any, 'showReaction');

    component.pets = [{
      images: ['img1.jpg'],
      name: 'Mila',
      age: 2,
      desc: 'Soy Mila',
      color: 'Marron',
      breed: 'Salchicha',
      size: 'Chico',
      gender: 'Hembra',
      adoptionId: 'adoption123'
    }];
    component.currentIndex = 0;

    adoptionServiceSpy.applyToAdoption.and.returnValue(of({ message: 'Solicitud enviada correctamente' }));

    component.onLike();
    // Verifica que 'showReaction' se llame con 'like'
    expect(showReactionSpy).toHaveBeenCalledWith('like');
  });
/*
  it('should receive onFiltersApplied event from FiltersComponent', () => {
    const filtersComponent = fixture.debugElement.query(By.directive(FiltersComponent)).componentInstance;

    const filtersData = {
      type: 'Perro',
      size: undefined,
      age: 'Joven',
      gender: undefined
    };

    filtersComponent.filters = filtersData;

    spyOn(component as any, 'onFiltersApplied').and.callThrough();
    filtersComponent.applyFilters();
    fixture.detectChanges();

    expect(component.onFiltersApplied).toHaveBeenCalledWith(jasmine.any(Object));
  });*/
});
