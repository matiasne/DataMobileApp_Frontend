import { TestBed, inject } from '@angular/core/testing';

import { ReservasPendientesService } from './reservas-pendientes.service';

describe('ReservasPendientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservasPendientesService]
    });
  });

  it('should be created', inject([ReservasPendientesService], (service: ReservasPendientesService) => {
    expect(service).toBeTruthy();
  }));
});
