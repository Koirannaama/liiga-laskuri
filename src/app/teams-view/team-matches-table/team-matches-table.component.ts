import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Match } from '../models/match';

enum MatchColumn {
    MatchUp = 'MatchUp',
    Result = 'Result',
    ExpectedGoals = 'ExpectedGoals',
    Date = 'Date',
    Attendance = 'Attendance',
}

@Component({
    selector: 'app-team-matches-table',
    templateUrl: './team-matches-table.component.html',
    styleUrls: ['./team-matches-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMatchesTableComponent {
    @Input() public set matches(matches: Match[]) {
        this.dataSource.data = matches;
    }

    public readonly dataSource = new MatTableDataSource<Match>([]);

    public readonly MatchColumn = MatchColumn;
    public readonly columns = [
        MatchColumn.Date,
        MatchColumn.MatchUp,
        MatchColumn.Result,
        MatchColumn.ExpectedGoals,
        MatchColumn.Attendance,
    ] as const;
}
