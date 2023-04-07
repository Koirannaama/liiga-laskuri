import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LiigaGatewayService } from 'src/app/data-access/liiga-gateway.service';

import { StandingsStateService } from './standings-state.service';

describe('StandingsStateService', () => {
    let service: StandingsStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StandingsStateService,
                { provide: LiigaGatewayService, useValue: { fetchSchedule: of([])} }
            ]
        });
        service = TestBed.inject(StandingsStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
