import { FinishedType, MatchDTO } from 'src/app/data-access/models/match-dto';
import { MatchSelection } from '../models/standings-filter';
import { DailyStanding } from '../models/daily-standing';
import { DateTime } from 'luxon';
import { Standing } from '../models/standing';

export class StandingsBuilder {
    public readonly finalStandings: Standing[];
    public readonly dailyStandings: Map<string, DailyStanding[]>;

    constructor(matches: MatchDTO[], cutOff: Date, matchSelection: MatchSelection) {
        this.dailyStandings = this.buildStandings(matches, cutOff, matchSelection);
        this.finalStandings = Array.from(this.dailyStandings.values())
            .map(dailyStandings => dailyStandings[dailyStandings.length - 1])
            .filter(s => !!s) as Standing[];
    }

    private buildStandings(matches: MatchDTO[], cutOff: Date, matchSelection: MatchSelection): Map<string, DailyStanding[]> {
        matches.sort((a, b) => DateTime.fromISO(a.start).toMillis() - DateTime.fromISO(b.start).toMillis());
        const startDate = DateTime.fromISO(matches[ 0 ]?.start).minus({ days: 1 });
        const standings = new Map<string, DailyStanding[]>();
        
        for (const match of matches) {
            if (!match.ended || this.isFixtureAfter(match, cutOff)) {
                continue;
            }

            const date = DateTime.fromISO(match.start);
            const points = this.getPoints(match);
            const homeTeam = match.homeTeam.teamName;
            const awayTeam = match.awayTeam.teamName;
            const addDailyStanding = (team: string, teamGoals: number, opponentGoals: number): DailyStanding[] => {
                const teamStandings = standings.get(team) ?? [this.emptyStanding(team, startDate)];
                const currentStanding = teamStandings[teamStandings.length - 1];
                return teamStandings.concat(this.createStanding(currentStanding, points[ team ], teamGoals, opponentGoals, date));
            };

            if ([MatchSelection.All, MatchSelection.Home].includes(matchSelection)) {
                standings.set(homeTeam, addDailyStanding(homeTeam, match.homeTeam.goals, match.awayTeam.goals));
            }
            if ([MatchSelection.All, MatchSelection.Away].includes(matchSelection)) {
                standings.set(awayTeam, addDailyStanding(awayTeam, match.awayTeam.goals, match.homeTeam.goals));  
            }        
        }

        return standings;
    }

    private createStanding(
        previousStanding: DailyStanding,
        points: number,
        goalsFor: number,
        goalsAgainst: number,
        date: DateTime
    ): DailyStanding {
        const totalGoalsFor = previousStanding.goalsFor + goalsFor;
        const totalGoalsAgainst = previousStanding.goalsAllowed + goalsAgainst;
        const totalPoints = previousStanding.points + points;
        const totalGamesPlayed = previousStanding.gamesPlayed + 1;
        return { ...previousStanding,
            gamesPlayed: totalGamesPlayed,
            points: totalPoints,
            goalsFor: totalGoalsFor,
            goalsAllowed: totalGoalsAgainst,
            goalDiff: totalGoalsFor - totalGoalsAgainst,
            date,
            pointsPerGame: totalPoints / totalGamesPlayed
        };
    }

    private emptyStanding(teamName: string, startDate: DateTime): DailyStanding {
        return {
            teamName,
            gamesPlayed: 0,
            points: 0,
            goalsAllowed: 0,
            goalsFor: 0,
            goalDiff: 0,
            date: startDate,
            pointsPerGame: 0,
        };
    }

    private getPoints(match: MatchDTO): Record<string, number> {
        const fullPoints = 3;
        const isHomeWin = match.homeTeam.goals > match.awayTeam.goals;
        const winnerPoints = match.finishedType === FinishedType.ENDED_DURING_REGULAR_GAME_TIME ? fullPoints : fullPoints - 1;
        const homePoints = isHomeWin ? winnerPoints : fullPoints - winnerPoints;
        return {
            [match.homeTeam.teamName]: homePoints,
            [match.awayTeam.teamName]: fullPoints - homePoints
        };
    }

    private isFixtureAfter(match: MatchDTO, date: Date): boolean {
        const start = new Date(match.start);
        return start.getFullYear() > date.getFullYear()
            || start.getFullYear() === date.getFullYear() && start.getMonth() > date.getMonth()
            || start.getFullYear() === date.getFullYear() && start.getMonth() === date.getMonth() && start.getDate() > date.getDate();

    }
}