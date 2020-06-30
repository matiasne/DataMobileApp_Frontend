import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesComponent } from './comprobantes.component';

describe('ComprobantesComponent', () => {
  let component: ComprobantesComponent;
  let fixture: ComponentFixture<ComprobantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
