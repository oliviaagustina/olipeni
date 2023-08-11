import { TestBed } from '@angular/core/testing';

import { CreateramService } from './createram.service';

describe('CreateramService', () => {
  let service: CreateramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
