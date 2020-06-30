import { TestBed, inject } from '@angular/core/testing';

import { ListaDePreciosService } from './lista-de-precios.service';

describe('ListaDePreciosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListaDePreciosService]
    });
  });

  it('should be created', inject([ListaDePreciosService], (service: ListaDePreciosService) => {
    expect(service).toBeTruthy();
  }));
});
