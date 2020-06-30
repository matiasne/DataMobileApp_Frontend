import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEditComponent } from './usuarios-edit.component';

describe('UsuarioEditComponent', () => {
  let component: UsuariosEditComponent;
  let fixture: ComponentFixture<UsuariosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
