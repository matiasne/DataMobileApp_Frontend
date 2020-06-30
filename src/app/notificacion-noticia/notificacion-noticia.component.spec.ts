import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionNoticiaComponent } from './notificacion-noticia.component';

describe('NotificacionNoticiaComponent', () => {
  let component: NotificacionNoticiaComponent;
  let fixture: ComponentFixture<NotificacionNoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionNoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
