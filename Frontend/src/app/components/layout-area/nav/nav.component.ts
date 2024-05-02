import { Component } from '@angular/core';
import { AuthMenuComponent } from '../../auth-area/auth-menu/auth-menu.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [AuthMenuComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
