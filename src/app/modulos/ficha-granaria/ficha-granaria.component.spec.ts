import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaGranariaComponent } from './ficha-granaria.component';

describe('FichaGranariaComponent', () => {
  let component: FichaGranariaComponent;
  let fixture: ComponentFixture<FichaGranariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaGranariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaGranariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
