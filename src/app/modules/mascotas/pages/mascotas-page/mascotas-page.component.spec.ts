import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasPageComponent } from './mascotas-page.component';

describe('MascotasPageComponent', () => {
  let component: MascotasPageComponent;
  let fixture: ComponentFixture<MascotasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MascotasPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
