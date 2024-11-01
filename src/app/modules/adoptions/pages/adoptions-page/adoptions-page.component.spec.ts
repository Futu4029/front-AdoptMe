import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionsPageComponent } from './adoptions-page.component';
import {AdoptionService} from "@service/adoption-service";
import {MisAdopcionesComponent} from "@modules/mis-adopciones/pages/mis-adopciones/mis-adopciones.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {SharedModule} from "@shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
      declarations: [AdoptionsPageComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AdoptionService, useValue: adoptionServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    adoptionServiceSpy = TestBed.inject(AdoptionService) as jasmine.SpyObj<AdoptionService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    adoptionServiceSpy.searchFilteredAdoptions.and.returnValue(of([])); // Return an empty array or mock data as an observable
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
    const mockAdoptions = [
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

      ];// Datos simulados de adopciones

    // Simula el retorno del metodo searchFilteredAdoptions con un objeto que contiene data
    adoptionServiceSpy.searchFilteredAdoptions.and.returnValue(of(mockAdoptions));

    component.fetchAllAdoptions(); // Llama al metodo fetchAllAdoptions en el componente

    expect(adoptionServiceSpy.searchFilteredAdoptions).toHaveBeenCalled(); // Verifica que el servicio fue llamado
    expect(component.pets).toEqual(mockAdoptions); // Verifica que los datos de adopciones se establecieron correctamente
  });





});
