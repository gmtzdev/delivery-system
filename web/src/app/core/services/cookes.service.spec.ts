import { TestBed } from '@angular/core/testing';

import { CookesService } from './cookes.service';

describe('CookesService', () => {
  let service: CookesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
