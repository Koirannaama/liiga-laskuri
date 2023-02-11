import { DateTime } from 'luxon';
import { FinishedType, FixtureDTO } from 'src/app/data-access/models/fixture-dto';
import { DailyStanding } from '../models/daily-standing';
import { Standing } from '../models/standing';

export class StandingsBuilder {

    public readonly finalStandings: Standing[];
    public readonly dailyStandings: Map<string, DailyStanding[]>;

    constructor(fixtures: FixtureDTO[], cutOff: Date) {
        this.dailyStandings = this.buildStandings(fixtures, cutOff);
        this.finalStandings = Array.from(this.dailyStandings.values())
            .map(dailyStandings => dailyStandings[dailyStandings.length - 1])
            .filter(s => !!s) as Standing[];

    }

    private buildStandings(fixtures: FixtureDTO[], cutOff: Date): Map<string, DailyStanding[]> {
        fixtures.sort((a, b) => DateTime.fromISO(a.scheduled_start_time).toMillis() - DateTime.fromISO(b.scheduled_start_time).toMillis());
        const startDate = DateTime.fromISO(fixtures[ 0 ].scheduled_start_time).minus({ days: 1 });
        const standings = new Map<string, DailyStanding[]>();
        for (const fixture of fixtures) {
            const homeTeam = fixture.home_team_abbreviation;
            const awayTeam = fixture.away_team_abbreviation;
            const date = DateTime.fromISO(fixture.scheduled_start_time);
            const homeStandings = standings.get(homeTeam) ?? [this.emptyStanding(homeTeam, startDate)];
            const awayStandings = standings.get(awayTeam) ?? [this.emptyStanding(awayTeam, startDate)];
            let home = homeStandings[homeStandings.length - 1];
            let away = awayStandings[awayStandings.length - 1];

            if (fixture.finished && !this.isFixtureAfter(fixture, cutOff)) {
                const points = this.getPoints(fixture);
                home = this.updateStanding(home, points[ homeTeam ], fixture.home_goals, fixture.away_goals, date);
                away = this.updateStanding(away, points[ awayTeam ], fixture.away_goals, fixture.home_goals, date);
                standings.set(homeTeam, homeStandings.concat(home)).set(awayTeam, awayStandings.concat(away));
            }

        }

        return standings;
    }

    private updateStanding(
        standing: DailyStanding,
        points: number,
        goalsFor: number,
        goalsAgainst: number,
        date: DateTime
    ): DailyStanding {
        const totalGoalsFor = standing.goalsFor + goalsFor;
        const totalGoalsAgainst = standing.goalsAllowed + goalsAgainst;
        return { ...standing,
            gamesPlayed: standing.gamesPlayed + 1,
            points: standing.points + points,
            goalsFor: totalGoalsFor,
            goalsAllowed: totalGoalsAgainst,
            goalDiff: totalGoalsFor - totalGoalsAgainst,
            date
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
            date: startDate
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