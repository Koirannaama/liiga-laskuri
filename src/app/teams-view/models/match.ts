import { DateTime } from 'luxon';
import { FinishedType, MatchDTO } from 'src/app/data-access/models/match-dto';

export class Match {
    public readonly homeTeam: string;
    public readonly awayTeam: string;
    public readonly homeGoals: number;
    public readonly awayGoals: number;
    public readonly homeXG: number;
    public readonly awayXG: number;
    public readonly date: DateTime;
    public readonly attendance: number;
    public readonly result: string;

    constructor(dto: MatchDTO) {
        this.homeTeam = dto.homeTeam.teamName;
        this.awayTeam = dto.awayTeam.teamName;
        this.homeGoals = dto.homeTeam.goals;
        this.awayGoals = dto.awayTeam.goals;
        this.date = DateTime.fromISO(dto.start);
        this.attendance = dto.spectators;
        this.homeXG = dto.homeTeam.expectedGoals;
        this.awayXG = dto.awayTeam.expectedGoals;
        this.result = this.getResult(dto);
    }

    private getResult(dto: MatchDTO): string {
        let endType = '';
        if (dto.finishedType === FinishedType.ENDED_DURING_EXTENDED_GAME_TIME) {
            endType = 'JA';
        } else if (dto.finishedType === FinishedType.ENDED_DURING_WINNING_SHOT_COMPETITION) {
            endType = 'RL';
        }
        const goals = `${dto.homeTeam.goals} - ${dto.awayTeam.goals}`;
        return endType ? goals + ` (${endType})` : goals;
    }
}