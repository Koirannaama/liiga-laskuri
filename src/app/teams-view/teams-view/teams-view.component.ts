import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { TeamsStateService } from '../services/teams-state.service';
import { Season } from 'src/app/data-access/models/season';

@Component({
    selector: 'app-teams-view',
    templateUrl: './teams-view.component.html',
    styleUrls: ['./teams-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class TeamsViewComponent {
    @HostBinding('class') public class = 'view-component';

    constructor(public readonly stateService: TeamsStateService) {}

    public selectTeam(team: string): void {
        this.stateService.setTeam(team);
    }

    public selectSeason(season: Season): void {
        this.stateService.setSeason(season);
    }
}
