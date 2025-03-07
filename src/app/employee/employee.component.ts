import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from './employee.model';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { EmployeeServiceService } from '../employee-service.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    EmployeeListComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  isCreateEmployee: boolean = true;

  skills: String[] = [];

  constructor(
    private employeeService: EmployeeServiceService,
    private router: Router,
    private activetedRoute: ActivatedRoute
  ) {}

  employee: any;

  ngOnInit(): void {
    this.employee = this.activetedRoute.snapshot.data['employee'];
    console.log(this.employee);

    if (this.employee && this.employee.employeeId > 0) {
      this.isCreateEmployee = false;

      if (this.employee.employeeSkills != '') {
        this.skills = [];
        this.skills = this.employee.employeeSkills.split(',');
      }
    } else {
      this.isCreateEmployee = true;
    }
  }

  saveEmployee(employeeForm: NgForm): void {
    if (this.isCreateEmployee) {
      this.employeeService.saveEmployee(this.employee).subscribe({
        next: (res: Employee) => {
          console.log(res);
          employeeForm.reset();
          this.employee.employeeGender = '';
          this.skills = [];
          this.employee.employeeSkills = '';

          this.router.navigate(['/employee-list']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: (res: Employee) => {
          this.router.navigate(['/employee-list']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    }
  }

  checkSkills(skill: string) {
    return (
      this.employee.employeeSkills != null &&
      this.employee.employeeSkills.includes(skill)
    );
  }

  checkGender(gender: string) {
    return (
      this.employee.employeeGender != null &&
      this.employee.employeeGender == gender
    );
  }

  selectGender(gender: String): void {
    this.employee.employeeGender = gender;
  }

  OnSkillsChanges(event: any): void {
    console.log(event);
    if (event.checked) {
      this.skills.push(event.source.value);
    } else {
      this.skills.forEach((item, index) => {
        if (item == event.source.value) this.skills.splice(index, 1);
      });
    }
    this.employee.employeeSkills = this.skills.toString();
  }
}
