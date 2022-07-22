import { TestBed } from '@angular/core/testing';

import { LiigaGatewayService } from './liiga-gateway.service';

describe('LiigaGatewayService', () => {
  let service: LiigaGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiigaGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
