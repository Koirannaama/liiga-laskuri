import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Season } from 'src/app/data-access/models/season';
import { MatchSelection, StandingsFilter } from '../models/standings-filter';

@Component({
    selector: 'app-standings-filter',
    templateUrl: './standings-filter.component.html',
    styleUrls: ['./standings-filter.component.scss'],
})
export class StandingsFilterComponent {
    @HostBinding('class') public class = 'filter-bar'; 
    @Input() public filterState?: StandingsFilter;
    @Output() public cutOffDateSelect = new EventEmitter<Date>();
    @Output() public seasonSelect = new EventEmitter<Season>();
    @Output() public matchSelectionSelect = new EventEmitter<MatchSelection>();

    public MatchSelection = MatchSelection;

    public selectCutOffDate(date: Date | null): void {
        if (date) {
            this.cutOffDateSelect.emit(date);
        }
    }

    public selectSeason(season: Season): void {
        this.seasonSelect.emit(season);
    }

    public selectMatchSelection(selection: MatchSelection): void {
        if (selection) {
            this.matchSelectionSelect.emit(selection);
        }
    }
}
