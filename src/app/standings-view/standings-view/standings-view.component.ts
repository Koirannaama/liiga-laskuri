import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Season } from 'src/app/data-access/models/season';
import { StandingsStateService } from '../services/standings-state.service';

@Component({
    selector: 'app-standings-view',
    templateUrl: './standings-view.component.html',
    styleUrls: ['./standings-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandingsViewComponent {

    public mode: 'table' | 'graph' = 'table';

    constructor(public readonly standingsState: StandingsStateService) { }

    public filterByDate(cutOffDate: Date): void {
        this.standingsState.updateCutOffDate(cutOffDate);
    }

    public changeSeason(season: Season): void {
        this.standingsState.updateSeason(season);
    }
}
