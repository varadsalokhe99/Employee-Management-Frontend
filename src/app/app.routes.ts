import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component'; 
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolver } from './employee-resolver';
import { AdminLoginComponent } from './admin-login/admin-login.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'header', component:HeaderComponent},
    {path:'employee', component:EmployeeComponent, resolve : {employee: EmployeeResolver}},
    {path:'employee-list', component:EmployeeListComponent},
    {path:'login', component:AdminLoginComponent},

    {path:'', component:AdminLoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutes{ }