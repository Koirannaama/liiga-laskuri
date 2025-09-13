import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeasonSelectorComponent } from './season-selector.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

describe('SeasonSelectorComponent', () => {
    let component: SeasonSelectorComponent;
    let fixture: ComponentFixture<SeasonSelectorComponent>;
    let loader: HarnessLoader;

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
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    let consoleSpy: jest.SpyInstance;
    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(error => {
            if (!error?.message?.includes('Could not parse CSS stylesheet')) {
                console.warn('error');
            }
        });
    });

    afterAll(() => consoleSpy.mockRestore());

    it('should contain season options', async () => {
        const select = await loader.getHarness(MatSelectHarness);
        await select.open();
        const options = await select.getOptions();
        expect(options.length).toBe(6);
    });

    it('should show selected option', async () => {
        component.season = '2023';
        const select = await loader.getHarness(MatSelectHarness);
        const value = await select.getValueText();
        expect(value).toBe('2022 - 2023');
    });
});
