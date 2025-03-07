import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AdminLoginService } from '../admin-login.service';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';
import { AdminLogin } from './admin-login.model';
import {MatDividerModule} from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [HomeComponent, MatFormFieldModule, MatDividerModule,
            MatInputModule, MatIconModule, MatButtonModule,
            FormsModule, RouterModule, HttpClientModule,
   ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent  {
  
  login : AdminLogin;

  constructor(private adminloginservice : AdminLoginService, private router : Router){
    this.login = new AdminLogin();
  }

  onLogin() {
    this.adminloginservice.checkAdminLogin(this.login).subscribe(
      
       { next : (res: any) => {
            console.log('Response from checkAdminLogin:', res);
            if (res) {
                this.router.navigateByUrl('/home');
            } else {
                alert(res.message || 'No message provided');
            }
        }, 

        error: (error: any) => {
          console.error('Error during login:', error);
          alert('Username or Password is wrong');
      }
      }
    );
}

}