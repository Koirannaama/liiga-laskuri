import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsViewComponent } from './teams-view/teams-view.component';
import { SeasonSelectorComponent } from '../core/season-selector/season-selector.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TeamMatchesTableComponent } from './team-matches-table/team-matches-table.component';
import { MatTableModule } from '@angular/material/table';

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
    ],
    exports: [
        TeamsViewComponent,
    ],
})
export class TeamsViewModule { }
