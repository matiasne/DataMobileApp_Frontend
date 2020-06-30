import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaFinancieraLosCondoresComponent } from './ficha-financiera-los-condores.component';

describe('FichaFinancieraLosCondoresComponent', () => {
  let component: FichaFinancieraLosCondoresComponent;
  let fixture: ComponentFixture<FichaFinancieraLosCondoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaFinancieraLosCondoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaFinancieraLosCondoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
