import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsViewComponent } from './teams-view/teams-view.component';

@NgModule({
    declarations: [
        TeamsViewComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        TeamsViewComponent,
    ]
})
export class TeamsViewModule { }
