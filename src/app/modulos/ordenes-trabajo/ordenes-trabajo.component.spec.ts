import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesTrabajoComponent } from './ordenes-trabajo.component';

describe('OrdenesTrabajoComponent', () => {
  let component: OrdenesTrabajoComponent;
  let fixture: ComponentFixture<OrdenesTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
