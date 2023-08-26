import { Season } from 'src/app/data-access/models/season';

export enum MatchSelection {
    All = 'All',
    Home = 'Home',
    Away = 'Away'
}

export interface StandingsFilter {
    cutOff: Date;
    start: Date;
    end: Date;
    season: Season;
    matchSelection: MatchSelection;
}
