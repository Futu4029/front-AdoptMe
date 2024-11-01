import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MisAdopcionesComponent } from './mis-adopciones.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdoptionService } from '@service/adoption-service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('MisAdopcionesComponent', () => {
  let component: MisAdopcionesComponent;
  let fixture: ComponentFixture<MisAdopcionesComponent>;
  let adoptionServiceSpy: jasmine.SpyObj<AdoptionService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const adoptionServiceMock = jasmine.createSpyObj('AdoptionService', [
      'getAdoptionsById',
      'getApplicationsByAdoption',
      'acceptOrRejectcandidato'
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MisAdopcionesComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: AdoptionService, useValue: adoptionServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    adoptionServiceSpy = TestBed.inject(AdoptionService) as jasmine.SpyObj<AdoptionService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Configura el Spy para devolver datos simulados
    adoptionServiceSpy.getAdoptionsById.and.returnValue(of({ data: [] }));

    fixture = TestBed.createComponent(MisAdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch candidates for a specific adoption', () => {
    const adoptionId = '1';
    const mockCandidates = [{ user: { name: 'Alice', email: 'alice@example.com' } }];
    adoptionServiceSpy.getApplicationsByAdoption.and.returnValue(of({ data: mockCandidates }));

    component.getApplicationsByAdoption(adoptionId);

    expect(adoptionServiceSpy.getApplicationsByAdoption).toHaveBeenCalledWith(adoptionId);
    expect(component.misCandidatos[adoptionId]).toEqual(mockCandidates);
  });

  it('should toggle candidate visibility for a specific adoption', () => {
    const adoptionId = '1';
    component.mostrarCandidatos[adoptionId] = false;

    component.toggleCandidatos(adoptionId);

    expect(component.mostrarCandidatos[adoptionId]).toBeTrue();

    component.toggleCandidatos(adoptionId);

    expect(component.mostrarCandidatos[adoptionId]).toBeFalse();
  });

});
