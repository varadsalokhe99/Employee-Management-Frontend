import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { Employee } from '../employee/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{

  dataSource: Employee[] = [];

  constructor(private employeeService : EmployeeServiceService , private router : Router){
    this.getEmployeeList();
  }
  ngOnInit(): void {
  }

  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeContactNumber', 'employeeAddress','employeeGender',
    'employeeDepartment','employeeSkills', 'update', 'delete' 
  ];

  // Get All Employee

  getEmployeeList() : void{
    this.employeeService.getEmployees().subscribe({
        next: (res: Employee[]) =>{
          this.dataSource = res;
        },
        error: (err: HttpErrorResponse)=>{
          console.log(err);
        }
    });
  }

  //Delete Employee by Id

  deleteEmployee(employeeId : number):void{
      console.log(employeeId);
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next : (res) => {
          console.log(res);
          this.getEmployeeList(); 
        },

        error:(err: HttpErrorResponse) => {
          console.log(err);
        }
      });
  }


  //Update Employee 

  updateEmployee(employeeId : number) : void{
    this.router.navigate(['/employee',{employeeId: employeeId}]);
  }
 }
