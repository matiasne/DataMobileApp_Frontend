import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionNuevoUsuarioComponent } from './notificacion-nuevo-usuario.component';

describe('NotificacionNuevoUsuarioComponent', () => {
  let component: NotificacionNuevoUsuarioComponent;
  let fixture: ComponentFixture<NotificacionNuevoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionNuevoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionNuevoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
