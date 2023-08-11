import { TestBed } from '@angular/core/testing';

import { CreatestorageService } from './createstorage.service';

describe('CreatestorageService', () => {
  let service: CreatestorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatestorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
