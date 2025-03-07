import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminLogin } from './admin-login/admin-login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private httpclient : HttpClient) { }

 api = "http://localhost:8073";

  //Check admin login
  public checkAdminLogin(adminLogin : AdminLogin) {
    return this.httpclient.post(`${this.api}/login/admin`,adminLogin);
  }
}
