import { TestBed } from '@angular/core/testing';
import { of, skip } from 'rxjs';
import { LiigaGatewayService } from 'src/app/data-access/liiga-gateway.service';

import { StandingsStateService } from './standings-state.service';
import { MOCK_MATCHES } from '../test/match-dto.mock';

describe('StandingsStateService', () => {
    let service: StandingsStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StandingsStateService,
                { provide: LiigaGatewayService, useValue: { fetchMatches: () => of(MOCK_MATCHES) } },
            ],
        });
        service = TestBed.inject(StandingsStateService);
    });

    it('should create initial state', done => {
        service.state.subscribe(state => {
            expect(state.dailyStandings.get('Murskaajat')?.length).toBe(4);
            expect(state.dailyStandings.get('Vässykät')?.length).toBe(3);
            expect(state.dailyStandings.get('Myllyttäjät')?.length).toBe(4);
            expect(state.filter.start).toEqual(new Date(2023, 7, 4));
            expect(state.filter.end).toEqual(new Date(2023, 7, 7));
            done();
        });
    });

    it('should filter by cutoff date', done => {
        service.state.pipe(skip(2)).subscribe(state => {
            expect(state.filter.cutOff).toEqual(new Date(2023, 7, 5));
            expect(state.dailyStandings.get('Murskaajat')?.length).toBe(3);
            expect(state.dailyStandings.get('Vässykät')).toBeUndefined();
            expect(state.dailyStandings.get('Myllyttäjät')?.length).toBe(3);
            done();
        });
        service.updateCutOffDate(new Date(2023, 7, 5));
    });
});
