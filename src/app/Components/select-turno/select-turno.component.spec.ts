import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTurnoComponent } from './select-turno.component';

describe('SelectTurnoComponent', () => {
  let component: SelectTurnoComponent;
  let fixture: ComponentFixture<SelectTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
