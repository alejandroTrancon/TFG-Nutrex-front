import { TestBed } from '@angular/core/testing';

import { IngredientesPlatoService } from './ingredientes-plato.service';

describe('IngredientesPlatoService', () => {
  let service: IngredientesPlatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientesPlatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
