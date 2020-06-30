import { TestBed, inject } from '@angular/core/testing';

import { FichaFinancieraService } from './ficha-financiera.service';

describe('FichaFinancieraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FichaFinancieraService]
    });
  });

  it('should be created', inject([FichaFinancieraService], (service: FichaFinancieraService) => {
    expect(service).toBeTruthy();
  }));
});
