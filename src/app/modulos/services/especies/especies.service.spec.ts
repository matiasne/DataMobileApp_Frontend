import { TestBed, inject } from '@angular/core/testing';

import { EspeciesService } from './especies.service';

describe('EspeciesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspeciesService]
    });
  });

  it('should be created', inject([EspeciesService], (service: EspeciesService) => {
    expect(service).toBeTruthy();
  }));
});
