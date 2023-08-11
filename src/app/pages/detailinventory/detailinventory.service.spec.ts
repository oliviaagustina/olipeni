import { TestBed } from '@angular/core/testing';

import { DetailinventoryService } from './detailinventory.service';

describe('DetailinventoryService', () => {
  let service: DetailinventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailinventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
