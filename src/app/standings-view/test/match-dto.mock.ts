import { FinishedType, MatchDTO } from 'src/app/data-access/models/match-dto';

export const MOCK_MATCHES: MatchDTO[] = [
    {
        start: new Date(2023, 7, 4).toISOString(),
        finishedType: FinishedType.ENDED_DURING_REGULAR_GAME_TIME,
        homeTeam: {
            teamName: 'Murskaajat',
            goals: 3
        },
        awayTeam: {
            teamName: 'Myllyttäjät',
            goals: 2,
        },
        ended: true,
    },
    {
        start: new Date(2023, 7, 5).toISOString(),
        finishedType: FinishedType.ENDED_DURING_REGULAR_GAME_TIME,
        homeTeam: {
            teamName: 'Myllyttäjät',
            goals: 3
        },
        awayTeam: {
            teamName: 'Murskaajat',
            goals: 5,
        },
        ended: true,
    },
    {
        start: new Date(2023, 7, 6).toISOString(),
        finishedType: FinishedType.ENDED_DURING_EXTENDED_GAME_TIME,
        homeTeam: {
            teamName: 'Vässykät',
            goals: 1
        },
        awayTeam: {
            teamName: 'Murskaajat',
            goals: 0,
        },
        ended: true,
    },
    {
        start: new Date(2023, 7, 7).toISOString(),
        finishedType: FinishedType.ENDED_DURING_REGULAR_GAME_TIME,
        homeTeam: {
            teamName: 'Myllyttäjät',
            goals: 6
        },
        awayTeam: {
            teamName: 'Vässykät',
            goals: 0,
        },
        ended: true,
    },
];