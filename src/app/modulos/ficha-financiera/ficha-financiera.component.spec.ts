import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaFinancieraComponent } from './ficha-financiera.component';

describe('FichaFinancieraComponent', () => {
  let component: FichaFinancieraComponent;
  let fixture: ComponentFixture<FichaFinancieraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaFinancieraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
