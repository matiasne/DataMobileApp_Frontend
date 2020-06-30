import { TestBed, inject } from '@angular/core/testing';

import { CotizacionesService } from './cotizaciones.service';

describe('CotizacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CotizacionesService]
    });
  });

  it('should be created', inject([CotizacionesService], (service: CotizacionesService) => {
    expect(service).toBeTruthy();
  }));
});
