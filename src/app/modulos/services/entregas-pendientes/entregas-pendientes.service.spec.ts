import { TestBed, inject } from '@angular/core/testing';

import { EntregasPendientesService } from './entregas-pendientes.service';

describe('EntregasPendientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntregasPendientesService]
    });
  });

  it('should be created', inject([EntregasPendientesService], (service: EntregasPendientesService) => {
    expect(service).toBeTruthy();
  }));
});
