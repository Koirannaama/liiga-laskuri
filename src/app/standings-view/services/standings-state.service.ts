import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, merge, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { FixtureDTO } from 'src/app/data-access/models/fixture-dto';
import { LiigaGatewayService } from 'src/app/data-access/liiga-gateway.service';
import { StandingsState } from '../models/standings-state';
import { Season } from 'src/app/data-access/models/season';
import { StandingsBuilder } from '../util/standings-builder';

@Injectable({
    providedIn: 'root'
})
export class StandingsStateService {

    public readonly state: Observable<StandingsState>;
    public readonly isLoading: Observable<boolean>;

    private readonly _cutoffDate = new Subject<Date>();
    private readonly _season = new BehaviorSubject<Season>('2022');

    constructor(private _liigaData: LiigaGatewayService) {
        const schedule = this._season.pipe(
            switchMap(season => this._liigaData.fetchSchedule(season)),
            shareReplay(1)
        );
        const scheduleRange = schedule.pipe(map(fixtures => this.getScheduleRange(fixtures)), shareReplay(1));
        const cutOff = merge(
            this._cutoffDate,
            scheduleRange.pipe(map(range => range.end))
        );
        const filteredSchedule = combineLatest([schedule, cutOff]).pipe(shareReplay(1));
        const builder = filteredSchedule.pipe(
            map(([fixtures, cutOff]) => new StandingsBuilder(fixtures, cutOff)),
            shareReplay(1)
        );

        this.state = combineLatest([builder, scheduleRange, cutOff, this._season]).pipe(
            map(([builder, dates, cutOff, season]) => ({
                standings: builder.finalStandings,
                dailyStandings: builder.dailyStandings, 
                filter: {
                    start: dates.start,
                    end: dates.end,
                    cutOff,
                    season
                }
            }))
        );
        this.isLoading = merge(
            this._season.pipe(map(() => true)),
            schedule.pipe(map(() => false)),
        );
    }

    public updateCutOffDate(cutOff: Date): void {
        this._cutoffDate.next(cutOff);
    }

    public updateSeason(season: Season): void {
        this._season.next(season);
    }

    private getScheduleRange(fixtures: FixtureDTO[]): { start: Date, end: Date } {
        let start = new Date(Number.MAX_SAFE_INTEGER);
        let end = new Date(0);

        for (const fixture of fixtures) {
            if (fixture.finished) {
                const fixtureDate = new Date(fixture.scheduled_start_time);
                start = start < fixtureDate ? start : fixtureDate;
                end = end > fixtureDate ? end : fixtureDate;
            }
        }

        return { start, end };
    }
}
