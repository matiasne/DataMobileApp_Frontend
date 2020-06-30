import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasPendientesComponent } from './reservas-pendientes.component';

describe('ReservasPendientesComponent', () => {
  let component: ReservasPendientesComponent;
  let fixture: ComponentFixture<ReservasPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
