import { TestBed } from '@angular/core/testing';

import { TeamsStateService } from './teams-state.service';

describe('TeamsStateService', () => {
    let service: TeamsStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TeamsStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
