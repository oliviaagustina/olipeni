import { TestBed } from '@angular/core/testing';

import { CreatemerkService } from './createmerk.service';

describe('CreatemerkService', () => {
  let service: CreatemerkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatemerkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
