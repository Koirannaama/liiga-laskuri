import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StandingsViewModule } from './standings-view/standings-view.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { TeamsViewModule } from './teams-view/teams-view.module';
import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        StandingsViewModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NavBarComponent,
        TeamsViewModule,
    ],
    providers: [
        {
            provide: MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS,
            useValue: { hideMultipleSelectionIndicator: true, hideSingleSelectionIndicator: true },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideExperimentalZonelessChangeDetection(),
    ],
})
export class AppModule { }
