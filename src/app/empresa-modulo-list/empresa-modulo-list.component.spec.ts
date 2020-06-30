import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaComponentListComponent } from './empresa-component-list.component';

describe('EmpresaComponentEditComponent', () => {
  let component: EmpresaComponentListComponent;
  let fixture: ComponentFixture<EmpresaComponentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaComponentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
