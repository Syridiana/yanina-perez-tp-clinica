import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricaClinicaComponent } from './historica-clinica.component';

describe('HistoricaClinicaComponent', () => {
  let component: HistoricaClinicaComponent;
  let fixture: ComponentFixture<HistoricaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricaClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
