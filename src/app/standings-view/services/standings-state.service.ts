import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, merge, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { FinishedType, FixtureDTO } from 'src/app/data-access/models/fixture-dto';
import { LiigaGatewayService } from 'src/app/data-access/liiga-gateway.service';
import { Standing } from '../models/standing';
import { StandingsState } from '../models/standings-state';
import { Season } from 'src/app/data-access/models/season';

@Injectable({
    providedIn: 'root'
})
export class StandingsStateService {

    public readonly state: Observable<StandingsState>;

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
        const standings = filteredSchedule.pipe(
            map(([fixtures, cutOff]) => this.buildStandings(fixtures, cutOff))
        );
        this.state = combineLatest([standings, scheduleRange, cutOff, this._season]).pipe(
            map(([standings, dates, cutOff, season]) => ({
                standings,
                filter: {
                    start: dates.start,
                    end: dates.end,
                    cutOff,
                    season
                }
            }))
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

    private buildStandings(fixtures: FixtureDTO[], cutOff: Date): Standing[] {
        let start = new Date(Number.MAX_SAFE_INTEGER);
        let end = new Date(0);

        const standings = new Map<string, Standing>();
        for (const fixture of fixtures) {
            const homeTeam = fixture.home_team_abbreviation;
            const awayTeam = fixture.away_team_abbreviation;
            let home = standings.get(homeTeam) ?? this.emptyStanding(homeTeam);
            let away = standings.get(awayTeam) ?? this.emptyStanding(awayTeam);

            if (fixture.finished && !this.isFixtureAfter(fixture, cutOff)) {
                const points = this.getPoints(fixture);
                home = { ...home,
                    gamesPlayed: home.gamesPlayed + 1,
                    points: home.points + points[ homeTeam ],
                    goalsFor: home.goalsFor + fixture.home_goals,
                    goalsAllowed: home.goalsAllowed + fixture.away_goals
                };
                away = { ...away,
                    gamesPlayed: away.gamesPlayed + 1,
                    points: away.points + points[ awayTeam ],
                    goalsFor: away.goalsFor + fixture.away_goals,
                    goalsAllowed: away.goalsAllowed + fixture.home_goals
                };

                const fixtureStart = new Date(fixture.scheduled_start_time);
                start = start < fixtureStart ? start : fixtureStart;
                end = end > fixtureStart ? end : fixtureStart;
            }

            standings.set(homeTeam, home).set(awayTeam, away);
        }

        return Array.from(standings.values())
            .map(standing => ({ ...standing, goalDiff: standing.goalsFor - standing.goalsAllowed}))
            .sort((a, b) => b.points - a.points);
    }

    private emptyStanding(teamName: string): Standing {
        return {
            teamName,
            gamesPlayed: 0,
            points: 0,
            goalsAllowed: 0,
            goalsFor: 0,
            goalDiff: 0
        };
    }

    private getPoints(fixture: FixtureDTO): Record<string, number> {
        const fullPoints = 3;
        const isHomeWin = fixture.home_goals > fixture.away_goals;
        const winnerPoints = fixture.finished_type === FinishedType.RegularTime ? fullPoints : fullPoints - 1;
        const homePoints = isHomeWin ? winnerPoints : fullPoints - winnerPoints;
        return {
            [fixture.home_team_abbreviation]: homePoints,
            [fixture.away_team_abbreviation]: fullPoints - homePoints
        };
    }

    private isFixtureAfter(fixture: FixtureDTO, date: Date): boolean {
        const start = new Date(fixture.scheduled_start_time);
        return start.getFullYear() > date.getFullYear()
            || start.getFullYear() === date.getFullYear() && start.getMonth() > date.getMonth()
            || start.getFullYear() === date.getFullYear() && start.getMonth() === date.getMonth() && start.getDate() > date.getDate();

    }
}
