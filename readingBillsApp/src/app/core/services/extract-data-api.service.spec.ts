import { TestBed } from '@angular/core/testing';

import { ExtractDataApiService } from './extract-data-api.service';

describe('ExtractDataApiService', () => {
  let service: ExtractDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
