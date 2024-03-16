import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMatchesTableComponent } from './team-matches-table.component';

describe('TeamMatchesTableComponent', () => {
  let component: TeamMatchesTableComponent;
  let fixture: ComponentFixture<TeamMatchesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMatchesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamMatchesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
