import { TestBed, inject } from '@angular/core/testing';

import { ModuloService } from './modulo.service';

describe('ModuloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuloService]
    });
  });

  it('should be created', inject([ModuloService], (service: ModuloService) => {
    expect(service).toBeTruthy();
  }));
});
