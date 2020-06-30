import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionComponent } from './cotizacion.component';

describe('CotizacionComponent', () => {
  let component: CotizacionComponent;
  let fixture: ComponentFixture<CotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
