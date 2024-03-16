import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { TeamsStateService } from '../services/teams-state.service';

@Component({
    selector: 'app-teams-view',
    templateUrl: './teams-view.component.html',
    styleUrls: ['./teams-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsViewComponent {
    @HostBinding('class') public class = 'view-component';

    constructor(public readonly stateService: TeamsStateService) {}

    public selectTeam(team: string): void {
        this.stateService.setTeam(team);
    }
}
