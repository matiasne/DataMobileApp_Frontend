import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePreciosComponent } from './lista-de-precios.component';

describe('ListaDePreciosComponent', () => {
  let component: ListaDePreciosComponent;
  let fixture: ComponentFixture<ListaDePreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDePreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDePreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
