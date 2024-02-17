import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsViewComponent } from './standings-view/standings-view/standings-view.component';
import { TeamsViewComponent } from './teams-view/teams-view/teams-view.component';

const routes: Routes = [
    { path: '', component: StandingsViewComponent },
    { path: 'teams', component: TeamsViewComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule { }
