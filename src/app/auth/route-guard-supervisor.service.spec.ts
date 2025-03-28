import { TestBed } from '@angular/core/testing';

import { RouteGuardSupervisorService } from './route-guard-supervisor.service';

describe('RouteGuardSupervisorService', () => {
  let service: RouteGuardSupervisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardSupervisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
