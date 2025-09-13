import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsViewComponent } from './teams-view/teams-view.component';
import { SeasonSelectorComponent } from '../core/season-selector/season-selector.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TeamMatchesTableComponent } from './team-matches-table/team-matches-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavToggleComponent } from '../core/sidenav-toggle/sidenav-toggle.component';
import { SidenavModeDirective } from '../core/sidenav-mode.directive';

@NgModule({
    declarations: [
        TeamsViewComponent,
        TeamMatchesTableComponent,
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        SeasonSelectorComponent,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        SidenavToggleComponent,
        SidenavModeDirective,
    ],
    exports: [
        TeamsViewComponent,
    ],
})
export class TeamsViewModule { }
