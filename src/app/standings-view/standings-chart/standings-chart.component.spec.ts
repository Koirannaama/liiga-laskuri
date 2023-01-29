import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsChartComponent } from './standings-chart.component';

describe('StandingsChartComponent', () => {
    let component: StandingsChartComponent;
    let fixture: ComponentFixture<StandingsChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StandingsChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(StandingsChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
