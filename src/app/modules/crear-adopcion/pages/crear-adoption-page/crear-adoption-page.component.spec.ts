import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdoptionPageComponent } from './crear-adoption-page.component';

describe('CrearAdoptionPageComponent', () => {
  let component: CrearAdoptionPageComponent;
  let fixture: ComponentFixture<CrearAdoptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAdoptionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAdoptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
