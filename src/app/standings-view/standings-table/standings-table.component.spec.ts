import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StandingsTableComponent } from './standings-table.component';

describe('StandingsTableComponent', () => {
    let component: StandingsTableComponent;
    let fixture: ComponentFixture<StandingsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatTableModule, MatSortModule, NoopAnimationsModule],
            declarations: [StandingsTableComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(StandingsTableComponent);
        component = fixture.componentInstance;
        component.standings = [];
        //fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
