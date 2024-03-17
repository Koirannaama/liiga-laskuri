import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StandingsViewModule } from './standings-view/standings-view.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { TeamsViewModule } from './teams-view/teams-view.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        StandingsViewModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NavBarComponent,
        TeamsViewModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
