import { FinishedType, FixtureDTO } from 'src/app/data-access/models/fixture-dto';

export const MOCK_FIXTURES: FixtureDTO[] = [
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