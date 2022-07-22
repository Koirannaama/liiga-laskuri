export enum FinishedType {
    RegularTime = 1,
    OverTime = 2,
    ShootOut = 3
}

export interface FixtureDTO {
    home_goals: number;
    away_goals: number;
    home_team_abbreviation: string;
    away_team_abbreviation: string;
    scheduled_start_time: string;
    finished_type: FinishedType;
    finished: boolean;
}
