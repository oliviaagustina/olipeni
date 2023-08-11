import { TestBed } from '@angular/core/testing';

import { CreatelocationService } from './createlocation.service';

describe('CreatelocationService', () => {
  let service: CreatelocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatelocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
