import { TestBed } from '@angular/core/testing';

import { CreateinventoryService } from './createinventory.service';

describe('CreateinventoryService', () => {
  let service: CreateinventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateinventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
