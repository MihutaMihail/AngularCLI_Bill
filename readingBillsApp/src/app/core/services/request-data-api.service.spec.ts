import { TestBed } from '@angular/core/testing';

import { RequestDataApiService } from './request-data-api.service';

describe('ExtractDataApiService', () => {
  let service: RequestDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
