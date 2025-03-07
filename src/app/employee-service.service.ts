import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private httpClient : HttpClient) { }

  api = "http://localhost:8073"


  // Add Employee Service Api integration
  public saveEmployee(employee : Employee) : Observable<Employee>{
    return  this.httpClient.post<Employee>(`${this.api}/save/employee`, employee)
  }
  
  //Get All EMployee Service Api integration
  public getEmployees() : Observable<Employee []>{
    return  this.httpClient.get<Employee []>(`${this.api}/get/employee` )
  }

  //Delete Employee By id Service Api integration
  public deleteEmployee(employeeId : number) {
    return this.httpClient.delete<Employee>(`${this.api}/delete/employee/${employeeId}`)
  }

  //Get Employee by Id
  public getEmployeeById(employeeId : number): Observable<Employee> {
    return  this.httpClient.get<Employee>(`${this.api}/get/employee/${employeeId}`)
  }

  public updateEmployee(employee : Employee) {
    return this.httpClient.put<Employee>(`${this.api}/update/employee`, employee);
  }
}
