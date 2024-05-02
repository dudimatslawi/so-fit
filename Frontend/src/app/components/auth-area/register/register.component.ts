import { Component } from '@angular/core';
import UserModel from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { appStore } from '../../../redux/store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    public user = new UserModel();

    public constructor(private authService: AuthService, private router: Router){}


    public async send(): Promise<void>{
        try{
            await this.authService.register(this.user);
            const registeredUser = appStore.getState().user;
            alert(`Welcome ${registeredUser.firstName} ${registeredUser.lastName}!`); 
            this.router.navigateByUrl("/home")
        }
        catch(err: any){
            alert(err.response.data)
        }
    }
}
