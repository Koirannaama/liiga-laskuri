import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Season } from 'src/app/data-access/models/season';

@Component({
    selector: 'app-season-selector',
    templateUrl: './season-selector.component.html',
    styleUrls: ['./season-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
    ],
})
export class SeasonSelectorComponent {
    @Input() public season?: Season;
    @Output() public seasonChange = new EventEmitter<Season>();

    public readonly seasonOptions: { [season in Season]: string } = {
        '2020': '2019 - 2020',
        '2021': '2020 - 2021',
        '2022': '2021 - 2022',
        '2023': '2022 - 2023',
        '2024': '2023 - 2024',
        '2025': '2024 - 2025',
    };
}
