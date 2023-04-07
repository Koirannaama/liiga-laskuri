import { FinishedType, FixtureDTO } from 'src/app/data-access/models/fixture-dto';
import { Standing } from '../models/standing';
import { StandingsBuilder } from './standings-builder';

describe('StandingsBuilder', () => {
    const data: FixtureDTO[] = [
        {
            home_goals: 3,
            away_goals: 2,
            home_team_abbreviation: 'Murskaajat',
            away_team_abbreviation: 'Myllyttäjät',
            scheduled_start_time: new Date(2023, 7, 4).toISOString(),
            finished_type: FinishedType.RegularTime,
            finished: true
        },
        {
            home_goals: 3,
            away_goals: 5,
            home_team_abbreviation: 'Myllyttäjät',
            away_team_abbreviation: 'Murskaajat',
            scheduled_start_time: new Date(2023, 7, 5).toISOString(),
            finished_type: FinishedType.RegularTime,
            finished: true
        },
        {
            home_goals: 1,
            away_goals: 0,
            home_team_abbreviation: 'Vässykät',
            away_team_abbreviation: 'Murskaajat',
            scheduled_start_time: new Date(2023, 7, 6).toISOString(),
            finished_type: FinishedType.OverTime,
            finished: true
        },
        {
            home_goals: 6,
            away_goals: 0,
            home_team_abbreviation: 'Myllyttäjät',
            away_team_abbreviation: 'Vässykät',
            scheduled_start_time: new Date(2023, 7, 7).toISOString(),
            finished_type: FinishedType.RegularTime,
            finished: true
        }
    ];

    it('should handle empty fixture list', () => {
        const builder = new StandingsBuilder([], new Date(2000, 1, 1));

        expect(builder.finalStandings.length).toBe(0);
        expect(builder.dailyStandings.size).toBe(0);
    });

    describe('should calculate final standings', () => {
        let builder: StandingsBuilder;
        let finalStandings = (team: string): Standing | undefined => builder.finalStandings.find(s => s.teamName === team);
        beforeEach(() => {
            builder = new StandingsBuilder(data, new Date(2023, 11, 11));
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