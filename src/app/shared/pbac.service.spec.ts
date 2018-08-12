import { TestBed, inject } from '@angular/core/testing';

import { PbacService } from './pbac.service';

describe('PbacService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PbacService]
    });
  });

  it('should be created', inject([PbacService], (service: PbacService) => {
    expect(service).toBeTruthy();
  }));
});
