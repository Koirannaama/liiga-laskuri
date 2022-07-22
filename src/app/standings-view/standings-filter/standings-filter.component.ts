import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Season } from 'src/app/data-access/models/season';
import { StandingsFilter } from '../models/standings-filter';

@Component({
    selector: 'app-standings-filter',
    templateUrl: './standings-filter.component.html',
    styleUrls: ['./standings-filter.component.scss']
})
export class StandingsFilterComponent {

    @Input() public filterState?: StandingsFilter;
    @Output() public cutOffDateSelect = new EventEmitter<Date>();
    @Output() public seasonSelect = new EventEmitter<Season>();

    public readonly seasonOptions: { [season in Season]: string } = {
        '2020': '2020 - 2021',
        '2021': '2021 - 2022'
    };

    public selectCutOffDate(date: Date | null): void {
        if (date) {
            this.cutOffDateSelect.emit(date);
        }
    }

    public selectSeason(season: Season): void {console.log(season);
        this.seasonSelect.emit(season);
    }
}
