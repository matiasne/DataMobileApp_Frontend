import { TestBed, inject } from '@angular/core/testing';

import { ComprobantesService } from './comprobantes.service';

describe('ComprobantesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprobantesService]
    });
  });

  it('should be created', inject([ComprobantesService], (service: ComprobantesService) => {
    expect(service).toBeTruthy();
  }));
});
