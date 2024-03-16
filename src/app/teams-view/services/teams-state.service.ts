import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { LiigaGatewayService } from 'src/app/data-access/liiga-gateway.service';
import { TeamsState } from '../models/teams-state';
import { Season } from 'src/app/data-access/models/season';
import { MatchDTO } from 'src/app/data-access/models/match-dto';
import { Match } from '../models/match';

@Injectable({
    providedIn: 'root'
})
export class TeamsStateService {

    public readonly currentState: Observable<TeamsState>;
    public readonly initialSeason: Season = '2024';

    private readonly _selectedTeam = new BehaviorSubject<string>('');
    private readonly _season = new BehaviorSubject<Season>(this.initialSeason);

    constructor(private _liigaData: LiigaGatewayService) {
        const matches = this._season.pipe(
            switchMap(season => this._liigaData.fetchMatches(season)),
            shareReplay(1),
        );
        this.currentState = combineLatest([matches, this._selectedTeam]).pipe(
            map((data) => this.createState(...data))
        );
    }

    public setTeam(team: string): void {
        this._selectedTeam.next(team);
    }

    private createState(matches: MatchDTO[], team: string): TeamsState {
        const emptyTeamMatches = new Map<string, Match[]>();
        const teams = matches.reduce(
            (allTeams, match) => allTeams.add(match.homeTeam.teamName).add(match.awayTeam.teamName),
            new Set<string>());
        const teamMatches =  matches.reduce((allTeamMatches, match) => {
            const isTeamMatch = match.homeTeam.teamName === team || match.awayTeam.teamName === team;
            if (!isTeamMatch || !match.ended) {
                return allTeamMatches;
            }

            const opponent = match.homeTeam.teamName !== team ? match.homeTeam.teamName : match.awayTeam.teamName;
            const opponentMatches = allTeamMatches.get(opponent) ?? [];
            return allTeamMatches.set(opponent, opponentMatches.concat(new Match(match)));
        }, emptyTeamMatches);

        return {
            teamMatches: [...teamMatches.entries()].sort((a, b) => a[0].localeCompare(b[0])),
            teams: [...teams].sort((a, b) => a.localeCompare(b)),
            selectedTeam: team
        };
    }
}
