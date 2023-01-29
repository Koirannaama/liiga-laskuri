import { DailyStanding } from './daily-standing';
import { Standing } from './standing';
import { StandingsFilter } from './standings-filter';

export interface StandingsState {
    standings: Standing[];
    dailyStandings: Map<string, DailyStanding[]>;
    filter: StandingsFilter;
}
