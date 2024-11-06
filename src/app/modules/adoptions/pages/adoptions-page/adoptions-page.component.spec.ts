import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
import { MatSnackBar } from '@angular/material/snack-bar';


describe('AdoptionsPageComponent', () => {
  let component: AdoptionsPageComponent;
  let fixture: ComponentFixture<AdoptionsPageComponent>;
  let adoptionServiceSpy: jasmine.SpyObj<AdoptionService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;


  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
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
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarSpy }
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

  it('should call showReaction with "Reject" when onReject is called', () => {
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

    component.onReject();
    // Verifica que 'showReaction' se llame con 'reject'
    expect(showReactionSpy).toHaveBeenCalledWith('reject');
  });

  it('should display error toast on failure in onLike', () => {
    // Simula un error en applyToAdoption
    adoptionServiceSpy.applyToAdoption.and.returnValue(throwError(() => new Error('Error en like')));

    // Llama al metodo onLike
    component.onLike();

    // Verifica que el toast se muestre con el mensaje correcto
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Hubo un error al dar like a la solicitud',
      'Cerrar',
      { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
    );
  });

  it('should display error toast on failure in onReject', () => {
    // Simula un error en blackListAdoption
    adoptionServiceSpy.blackListAdoption.and.returnValue(throwError(() => new Error('Error en reject')));

    component.onReject();

    // Verifica que el toast se muestre con el mensaje correcto
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Hubo un error al rechazar la solicitud',
      'Cerrar',
      { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
    );
  });

  it('should display error toast on failure in fetchAllAdoptions', () => {
    // Simula un error en searchFilteredAdoptions
    adoptionServiceSpy.searchFilteredAdoptions.and.returnValue(throwError(() => new Error('Error en fetch')));

    component.fetchAllAdoptions();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Hubo un error al buscar las adopciones',
      'Cerrar',
      { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
    );
  });

  it('should remove pet from petsList after animation ends ON LIKE', fakeAsync(() => {
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
    const initialPetsCount = component.pets.length;

    component.onLike();

    tick(1400); // Espera a que finalice la animación
    fixture.detectChanges();

    // Verifica que la longitud de petsList haya cambiado
    expect(component.pets.length).toBeLessThan(initialPetsCount);
  }));

  it('should remove pet from petsList after animation ends ON REJECT', fakeAsync(() => {
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
    const initialPetsCount = component.pets.length;

    component.onReject();

    tick(1400); // Espera a que finalice la animación
    fixture.detectChanges();

    // Verifica que la longitud de petsList haya cambiado
    expect(component.pets.length).toBeLessThan(initialPetsCount);
  }));

});
