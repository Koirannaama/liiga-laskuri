import { DateTime } from 'luxon';
import { Standing } from './standing';

export interface DailyStanding extends Standing {
    date: DateTime;
}