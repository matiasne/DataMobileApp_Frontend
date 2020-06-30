import { TestBed, inject } from '@angular/core/testing';

import { UsuarioActivoService } from './usuarioActivo.service';

describe('UsuarioActivoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioActivoService]
    });
  });

  it('should be created', inject([UsuarioActivoService], (service: UsuarioActivoService) => {
    expect(service).toBeTruthy();
  }));
});
