import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';
import { DailyStanding } from '../models/daily-standing';
import teamColor from './team-colors';

@Component({
    selector: 'app-standings-chart',
    templateUrl: './standings-chart.component.html',
    styleUrls: ['./standings-chart.component.scss'],
    standalone: false,
})
export class StandingsChartComponent {

    @Input() public set dailyStandings(dailyStandings: Map<string, DailyStanding[]>) {
        this.lineChartData = {
            datasets: Array.from(dailyStandings.entries()).sort((e1, e2) => e1[0].localeCompare(e2[0])).map(
                (entry) => ({
                    label: entry[0],
                    data: entry[1].map(s => ({x: s.date, y: s.points})),
                    fill: false,
                    borderWidth: 2,
                    borderColor: teamColor(entry[0]),
                    pointBackgroundColor: teamColor(entry[0]),
                    pointBorderColor: teamColor(entry[0]),
                    backgroundColor: teamColor(entry[0]),
                })
            ),
        };
    }
    public lineChartData?: ChartData<'line', { x: DateTime, y: number }[]>;
    public readonly lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    tooltipFormat: 'dd.MM.yyyy',
                },
            },
        },
    } as const;
}
