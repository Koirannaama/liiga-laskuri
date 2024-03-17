import { FinishedType, MatchDTO } from 'src/app/data-access/models/match-dto';

export const MOCK_MATCHES: MatchDTO[] = [
    {
        start: new Date(2023, 7, 4).toISOString(),
        finishedType: FinishedType.ENDED_DURING_REGULAR_GAME_TIME,
        homeTeam: {
            teamName: 'Murskaajat',
            goals: 3,
            expectedGoals: 1.20,
        },
        awayTeam: {
            teamName: 'Myllyttäjät',
            goals: 2,
            expectedGoals: 2.45,
        },
        ended: true,
        spectators: 1234,
    },
    {
        start: new Date(2023, 7, 5).toISOString(),
        finishedType: FinishedType.ENDED_DURING_REGULAR_GAME_TIME,
        homeTeam: {
            teamName: 'Myllyttäjät',
            goals: 3,
            expectedGoals: 0,
        },
        awayTeam: {
            teamName: 'Murskaajat',
            goals: 5,
            expectedGoals: 0,
        },
        ended: true,
        spectators: 1234,
    },
    {
        start: new Date(2023, 7, 6).toISOString(),
        finishedType: FinishedType.ENDED_DURING_EXTENDED_GAME_TIME,
        homeTeam: {
            teamName: 'Vässykät',
            goals: 1,
            expectedGoals: 0,
        },
        awayTeam: {
            teamName: 'Murskaajat',
            goals: 0,
            expectedGoals: 0,
        },
        ended: true,
        spectators: 1234,
    },
    {
        start: new Date(2023, 7, 7).toISOString(),
        finishedType: FinishedType.ENDED_DURING_REGULAR_GAME_TIME,
        homeTeam: {
            teamName: 'Myllyttäjät',
            goals: 6,
            expectedGoals: 0,
        },
        awayTeam: {
            teamName: 'Vässykät',
            goals: 0,
            expectedGoals: 0,
        },
        ended: true,
        spectators: 1234,
    },
];