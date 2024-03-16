import { Match } from './match';

export interface TeamsState {
    selectedTeam?: string;
    teams: string[];
    teamMatches: [string, Match[]][];
}
