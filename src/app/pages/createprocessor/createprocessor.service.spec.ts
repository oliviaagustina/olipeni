import { TestBed } from '@angular/core/testing';

import { CreateprocessorService } from './createprocessor.service';

describe('CreateprocessorService', () => {
  let service: CreateprocessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateprocessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
