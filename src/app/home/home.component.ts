import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { EmployeeComponent } from '../employee/employee.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule, EmployeeComponent, RouterModule, MatButtonModule, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
