import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsFilterComponent } from './standings-filter.component';

describe('StandingsFilterComponent', () => {
    let component: StandingsFilterComponent;
    let fixture: ComponentFixture<StandingsFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StandingsFilterComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(StandingsFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
