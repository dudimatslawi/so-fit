import { Component, OnInit } from '@angular/core';
import UserModel from '../../../models/user.model';
import { appStore } from '../../../redux/store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-auth-menu',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './auth-menu.component.html',
    styleUrl: './auth-menu.component.css'
})
export class AuthMenuComponent implements OnInit {
    public user: UserModel;

    public constructor(private authService: AuthService) { }
    public  ngOnInit(): void {
        try {
            this.user = appStore.getState().user
            console.log(this.user);
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    public logout(): void {
        try {
            this.authService.logout();
            alert(`bye bye ${this.user.firstName}`)
        }
        catch (err: any) {
            alert(err.message)
        }
    }

}
