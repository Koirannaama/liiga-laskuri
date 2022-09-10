import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Standing } from '../models/standing';

enum StandingsColumn {
    TeamName = 'TeamName',
    GamesPlayed = 'GamesPlayed',
    Points = 'Points',
    GoalsFor = 'GoalsFor',
    GoalsAllowed = 'GoalsAllowed',
    GoalDifferential = 'GoalDifferential'
}

@Component({
    selector: 'app-standings-table',
    templateUrl: './standings-table.component.html',
    styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent {

    @Input() public set standings(standings: Standing[]) {
        this.dataSource.data = standings;
    }

    public readonly StandingsColumn = StandingsColumn;
    public readonly columns = [
        StandingsColumn.TeamName,
        StandingsColumn.GamesPlayed,
        StandingsColumn.Points,
        StandingsColumn.GoalsFor,
        StandingsColumn.GoalsAllowed,
        StandingsColumn.GoalDifferential
    ] as const;
    public readonly dataSource = new MatTableDataSource<Standing>([]);

    constructor() {}

}
