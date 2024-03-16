import { TeamStatisticsDTO } from './team-statistics-dto';

export enum FinishedType {
    ENDED_DURING_REGULAR_GAME_TIME = 'ENDED_DURING_REGULAR_GAME_TIME',
    ENDED_DURING_WINNING_SHOT_COMPETITION = 'ENDED_DURING_WINNING_SHOT_COMPETITION',
    ENDED_DURING_EXTENDED_GAME_TIME = 'ENDED_DURING_EXTENDED_GAME_TIME',
}

export interface MatchDTO {
    start: string;
    finishedType: FinishedType;
    homeTeam: TeamStatisticsDTO;
    awayTeam: TeamStatisticsDTO;
    ended: boolean;
    spectators: number;
}
