import { TestBed, inject } from '@angular/core/testing';

import { FichaGranariaService } from './ficha-granaria.service';

describe('FichaGranariaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FichaGranariaService]
    });
  });

  it('should be created', inject([FichaGranariaService], (service: FichaGranariaService) => {
    expect(service).toBeTruthy();
  }));
});
