import { TestBed } from '@angular/core/testing';

import { TeamsStateService } from './teams-state.service';
import { LiigaGatewayService } from 'src/app/data-access/liiga-gateway.service';
import { Subscription, of } from 'rxjs';
import { MOCK_MATCHES } from 'src/app/standings-view/test/match-dto.mock';
import { TeamsState } from '../models/teams-state';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('TeamsStateService', () => {
    let service: TeamsStateService;
    let latestState: TeamsState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TeamsStateService,
                { provide: LiigaGatewayService, useValue: { fetchMatches: () => of(MOCK_MATCHES) } },
                provideExperimentalZonelessChangeDetection(),
            ],
        });
        service = TestBed.inject(TeamsStateService);
        service.currentState.subscribe(state => latestState = state);
    });

    it('should create initial state', () => {
        expect(latestState.selectedTeam).toBe('');
        expect(latestState.teams).toEqual(['Murskaajat', 'Myllyttäjät', 'Vässykät']),
        expect(latestState.teamMatches).toEqual([]);
    });

    it('should select team', () => {
        service.setTeam('Myllyttäjät');

        const teamMatches = new Map(latestState.teamMatches);
        expect(latestState.selectedTeam).toBe('Myllyttäjät');
        expect(teamMatches.get('Vässykät')?.length).toBe(1);
        expect(teamMatches.get('Murskaajat')?.length).toBe(2);
    });
});
