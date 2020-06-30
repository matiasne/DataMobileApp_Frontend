import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaModuloAddComponent } from './empresa-modulo-add.component';

describe('EmpresaModuloAddComponent', () => {
  let component: EmpresaModuloAddComponent;
  let fixture: ComponentFixture<EmpresaModuloAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaModuloAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaModuloAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
