import { TestBed } from '@angular/core/testing';

import { CheckWinnerService } from './check-winner.service';

describe('CheckWinnerService', () => {
  let service: CheckWinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckWinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
