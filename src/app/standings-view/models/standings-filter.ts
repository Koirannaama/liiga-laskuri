import { Season } from 'src/app/data-access/models/season';

export interface StandingsFilter {
    cutOff: Date;
    start: Date;
    end: Date;
    season: Season;
}
