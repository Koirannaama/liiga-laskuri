import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, merge, Observable, of, shareReplay, Subject, switchMap } from 'rxjs';
import { FixtureDTO } from 'src/app/data-access/models/fixture-dto';
import { LiigaGatewayService } from 'src/app/data-access/liiga-gateway.service';
import { StandingsState } from '../models/standings-state';
import { Season } from 'src/app/data-access/models/season';
import { StandingsBuilder } from '../util/standings-builder';
import { MatchSelection } from '../models/standings-filter';

@Injectable({
    providedIn: 'root'
})
export class StandingsStateService {

    public readonly state: Observable<StandingsState>;
    public readonly isLoading: Observable<boolean>;
    public readonly hasData: Observable<boolean>;

    private readonly _cutoffDate = new Subject<Date>();
    private readonly _season = new BehaviorSubject<Season>('2022');
    private readonly _matchSelection = new BehaviorSubject<MatchSelection>(MatchSelection.All);

    constructor(private _liigaData: LiigaGatewayService) {
        const schedule = this._season.pipe(
            switchMap(season => this._liigaData.fetchSchedule(season).pipe(catchError(() => of(<FixtureDTO[]>[])))),
            shareReplay(1),
        );
        const scheduleRange = schedule.pipe(map(fixtures => this.getScheduleRange(fixtures)), shareReplay(1));
        const cutOff = merge(
            this._cutoffDate,
            scheduleRange.pipe(map(range => range.end))
        );
        const filteredSchedule = combineLatest([schedule, cutOff, this._matchSelection]).pipe(shareReplay(1));
        const builder = filteredSchedule.pipe(
            map(([fixtures, cutOff, matchSelection]) => new StandingsBuilder(fixtures, cutOff, matchSelection)),
            shareReplay(1)
        );

        this.state = combineLatest([builder, scheduleRange, cutOff, this._season, this._matchSelection]).pipe(
            map(([builder, dates, cutOff, season, matchSelection]) => ({
                standings: builder.finalStandings,
                dailyStandings: builder.dailyStandings, 
                filter: {
                    start: dates.start,
                    end: dates.end,
                    cutOff,
                    season,
                    matchSelection
                }
            }))
        );
        this.isLoading = merge(
            this._season.pipe(map(() => true)),
            schedule.pipe(map(() => false)),
        );
        this.hasData = schedule.pipe(map(fixtures => !!fixtures.length));
    }

    public updateCutOffDate(cutOff: Date): void {
        this._cutoffDate.next(cutOff);
    }

    public updateSeason(season: Season): void {
        this._season.next(season);
    }

    public updateMatchSelection(selection: MatchSelection): void {
        this._matchSelection.next(selection);
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
