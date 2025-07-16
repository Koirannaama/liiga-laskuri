import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TeamMatchesTableComponent } from './team-matches-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatRowHarness } from '@angular/material/table/testing';
import { MOCK_MATCHES } from 'src/app/standings-view/test/match-dto.mock';
import { Match } from '../models/match';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('TeamMatchesTableComponent', () => {
    let component: TeamMatchesTableComponent;
    let fixture: ComponentFixture<TeamMatchesTableComponent>;
    let loader: HarnessLoader;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TeamMatchesTableComponent],
            imports: [
                MatTableModule,
            ],
            providers: [
                provideExperimentalZonelessChangeDetection(),
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(TeamMatchesTableComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should create match rows', async () => {
        component.matches = MOCK_MATCHES.slice(0, 2).map(dto => new Match(dto));
        const rows = await loader.getAllHarnesses(MatRowHarness);
        expect(rows.length).toBe(2);
    });

    it('should populate cells', async () => {
        component.matches = [new Match(MOCK_MATCHES[0])];
        const row = await loader.getHarness(MatRowHarness);
        const cells = await row.getCells();
        
        expect(await cells[0].getText()).toBe('4.8.2023');
        expect(await cells[1].getText()).toBe('Murskaajat - Myllyttäjät');
        expect(await cells[2].getText()).toBe('3 - 2');
        expect(await cells[3].getText()).toBe('1.2 - 2.45');
        expect(await cells[4].getText()).toBe('1234');
    });
});
