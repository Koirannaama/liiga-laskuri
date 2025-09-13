import { Directive } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { fromEvent, map, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[appSidenavMode]',
})
export class SidenavModeDirective {

    constructor(sidenav: MatSidenav) {
        const query = window.matchMedia('(width <= 1200px)');
        const matches = (): MatDrawerMode => !query.matches ? 'side' : 'over';
        fromEvent(query, 'change')
            .pipe(map(matches), startWith(matches()), takeUntilDestroyed())
            .subscribe(mode => sidenav.mode = mode);
    }
}
