import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranosComponent } from './granos.component';

describe('GranosComponent', () => {
  let component: GranosComponent;
  let fixture: ComponentFixture<GranosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GranosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
