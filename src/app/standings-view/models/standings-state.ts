import { Standing } from './standing';
import { StandingsFilter } from './standings-filter';

export interface StandingsState {
    standings: Standing[];
    filter: StandingsFilter;
}
