import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingsViewComponent } from './standings-view/standings-view.component';
import { StandingsTableComponent } from './standings-table/standings-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StandingsFilterComponent } from './standings-filter/standings-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FinDateAdapter } from '../util/fin-date-adapter';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { NgChartsModule } from 'ng2-charts';
import { StandingsChartComponent } from './standings-chart/standings-chart.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        StandingsViewComponent,
        StandingsTableComponent,
        StandingsFilterComponent,
        StandingsChartComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        MatProgressSpinnerModule,
        NgChartsModule,
        MatButtonToggleModule
    ],
    providers: [
        { provide: DateAdapter, useClass: FinDateAdapter },
        { provide: MAT_DATE_LOCALE, useValue: 'fi-FI' },
        { provide: MAT_DATE_FORMATS, useValue: {
            parse: {
                dateInput: 'LL',
              },
              display: {
                dateInput: 'DD.MM.YYYY',
                monthYearLabel: 'YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'YYYY',
              },
        } }
    ],
    exports: [
        StandingsViewComponent
    ]
})
export class StandingsViewModule { }
