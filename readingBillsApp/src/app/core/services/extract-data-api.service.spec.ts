import { TestBed } from '@angular/core/testing';

import { ExtractDataAPIService } from './extract-data-api.service';

describe('ExtractDataAPIService', () => {
  let service: ExtractDataAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractDataAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
