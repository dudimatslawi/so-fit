import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, NavComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
