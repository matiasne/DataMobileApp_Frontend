import { TestBed, inject } from '@angular/core/testing';

import { OrdenesTrabajoService } from './ordenes-trabajo.service';

describe('OrdenesTrabajoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdenesTrabajoService]
    });
  });

  it('should be created', inject([OrdenesTrabajoService], (service: OrdenesTrabajoService) => {
    expect(service).toBeTruthy();
  }));
});
