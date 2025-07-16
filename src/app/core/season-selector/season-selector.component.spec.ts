import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeasonSelectorComponent } from './season-selector.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SeasonSelectorComponent', () => {
    let component: SeasonSelectorComponent;
    let fixture: ComponentFixture<SeasonSelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SeasonSelectorComponent,
                NoopAnimationsModule,
            ],
            providers: [
                provideExperimentalZonelessChangeDetection(),
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(SeasonSelectorComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
