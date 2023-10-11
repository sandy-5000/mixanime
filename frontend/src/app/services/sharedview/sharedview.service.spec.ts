import { TestBed } from '@angular/core/testing';

import { SharedviewService } from './sharedview.service';

describe('SharedviewService', () => {
  let service: SharedviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
