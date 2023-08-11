import { TestBed } from '@angular/core/testing';

import { CreateseriesService } from './createseries.service';

describe('CreateseriesService', () => {
  let service: CreateseriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateseriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
