import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';
import { DailyStanding } from '../models/daily-standing';

@Component({
    selector: 'app-standings-chart',
    templateUrl: './standings-chart.component.html',
    styleUrls: ['./standings-chart.component.scss']
})
export class StandingsChartComponent {

    @Input() public set dailyStandings(dailyStandings: Map<string, DailyStanding[]>) {
        this.lineChartData = {
            datasets: Array.from(dailyStandings.entries()).map(
                (entry) => ({
                    label: entry[0],
                    data: entry[1].map(s => ({x: s.date, y: s.points})),
                    borderColor: 'black',
                    borderWidth: 2
                })
            )
        };
    }
    public lineChartData?: ChartData<'line', { x: DateTime, y: number }[]>;
    public readonly lineChartOptions: ChartOptions<'line'> = {
        responsive: false,
        scales: {
            x: {
                type: 'time'
            }
        }
    } as const;
}
