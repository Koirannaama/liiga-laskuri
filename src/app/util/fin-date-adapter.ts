import { NativeDateAdapter } from '@angular/material/core';

export class FinDateAdapter extends NativeDateAdapter {
    public override getFirstDayOfWeek(): number {
        return 1;
    }
}