import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import CredentialsModel from '../../../models/credentials.model';
import { appStore } from '../../../redux/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    public credentials = new CredentialsModel();

    public constructor(private authService: AuthService, private router: Router){}

    public async send(): Promise<void>{
        try{
            await this.authService.login(this.credentials);
            const firstName = appStore.getState().user.firstName;
            alert(`Welcome back ${firstName}!`); 
            this.router.navigateByUrl("/home")
        }
        catch(err: any){            
            alert(err.response.data)
        }
    }


}
