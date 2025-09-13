import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-sidenav-toggle',
    imports: [MatButtonModule],
    templateUrl: './sidenav-toggle.component.html',
    styleUrl: './sidenav-toggle.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavToggleComponent {
    @Input() public open = true;
    @Output() public openChange = new EventEmitter<boolean>();
}
