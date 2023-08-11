import { TestBed } from '@angular/core/testing';

import { CreatecategoryService } from './createcategory.service';

describe('CreatecategoryService', () => {
  let service: CreatecategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatecategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
