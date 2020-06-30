import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracionComponent } from './registracion.component';

describe('RegistracionComponent', () => {
  let component: RegistracionComponent;
  let fixture: ComponentFixture<RegistracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
