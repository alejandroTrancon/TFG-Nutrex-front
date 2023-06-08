import { TestBed } from '@angular/core/testing';

import { NutricionistaGuard } from './nutricionista.guard';

describe('NutricionistaGuard', () => {
  let guard: NutricionistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NutricionistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
