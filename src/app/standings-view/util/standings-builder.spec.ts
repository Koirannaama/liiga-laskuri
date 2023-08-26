import { Standing } from '../models/standing';
import { StandingsBuilder } from './standings-builder';
import { MatchSelection } from '../models/standings-filter';
import { MOCK_FIXTURES } from '../test/fixture-dto.mock';

describe('StandingsBuilder', () => {

    it('should handle empty fixture list', () => {
        const builder = new StandingsBuilder([], new Date(2000, 1, 1), MatchSelection.All);

        expect(builder.finalStandings.length).toBe(0);
        expect(builder.dailyStandings.size).toBe(0);
    });

    describe('should calculate final standings', () => {
        let builder: StandingsBuilder;
        const finalStandings = (team: string): Standing | undefined => builder.finalStandings.find(s => s.teamName === team);
        beforeEach(() => {
            builder = new StandingsBuilder(MOCK_FIXTURES, new Date(2023, 11, 11), MatchSelection.All);
        });

        it('for Murskaajat', () => {
            const murskaajat = finalStandings('Murskaajat');

            expect(murskaajat?.points).toBe(7);
            expect(murskaajat?.gamesPlayed).toBe(3);
            expect(murskaajat?.goalsFor).toBe(8);
            expect(murskaajat?.goalsAllowed).toBe(6);
            expect(murskaajat?.goalDiff).toBe(2);
        });

        it('for Myllyttäjät', () => {
            const murskaajat = finalStandings('Myllyttäjät');

            expect(murskaajat?.points).toBe(3);
            expect(murskaajat?.gamesPlayed).toBe(3);
            expect(murskaajat?.goalsFor).toBe(11);
            expect(murskaajat?.goalsAllowed).toBe(8);
            expect(murskaajat?.goalDiff).toBe(3);
        });

        it('for Vässykät', () => {
            const murskaajat = finalStandings('Vässykät');

            expect(murskaajat?.points).toBe(2);
            expect(murskaajat?.gamesPlayed).toBe(2);
            expect(murskaajat?.goalsFor).toBe(1);
            expect(murskaajat?.goalsAllowed).toBe(6);
            expect(murskaajat?.goalDiff).toBe(-5);
        });
    });
});