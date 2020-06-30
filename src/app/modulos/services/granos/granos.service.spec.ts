import { TestBed, inject } from '@angular/core/testing';

import { GranosService } from './granos.service';

describe('GranosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GranosService]
    });
  });

  it('should be created', inject([GranosService], (service: GranosService) => {
    expect(service).toBeTruthy();
  }));
});
