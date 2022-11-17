import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoriaClinicaComponent } from './user-historia-clinica.component';

describe('UserHistoriaClinicaComponent', () => {
  let component: UserHistoriaClinicaComponent;
  let fixture: ComponentFixture<UserHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHistoriaClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
