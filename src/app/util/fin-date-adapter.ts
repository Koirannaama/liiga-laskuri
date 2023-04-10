import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class FinDateAdapter extends NativeDateAdapter {
    public override getFirstDayOfWeek(): number {
        return 1;
    }
}