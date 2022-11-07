import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
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
    styleUrls: ['./standings-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandingsTableComponent implements AfterViewInit {
    @ViewChild(MatSort) public sort?: MatSort;

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

    public readonly test = [
        'test1', 'test2', 'test3'
    ] as const;

    public ngAfterViewInit(): void {
        if (this.sort) {
            this.dataSource.sort = this.sort;
            this.dataSource.sortData = (rows, sort) => this.sortStandings(rows, sort);
        }
    }

    private sortStandings(standings: Standing[], sort: MatSort): Standing[] {
        if (sort.direction === '') {
            return standings;
        }

        const accessors: { [ col in StandingsColumn ]?: (row: Standing) => number } = {
            [StandingsColumn.Points]: row => row.points,
            [StandingsColumn.GoalsFor]: row => row.goalsFor,
            [StandingsColumn.GoalsAllowed]: row => row.goalsAllowed,
            [StandingsColumn.GoalDifferential]: row => row.goalDiff
        };
        const accessor = accessors[ sort.active as StandingsColumn ] ?? (() => 0);
        const direction = sort.direction === 'desc' ? 1 : -1;
        return [...standings].sort((a, b) => this.compareRows(accessor, a, b) * direction);
    }

    private compareRows(accessor: (row: Standing) => number, row1: Standing, row2: Standing): number {
        return accessor(row2) - accessor(row1);
    }
}
