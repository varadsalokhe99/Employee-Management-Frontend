import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EmployeeServiceService } from './employee-service.service';
import { Observable, of } from 'rxjs';
import { Employee } from './employee/employee.model';
import { inject } from '@angular/core';


export const EmployeeResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  employeeService: EmployeeServiceService = inject(EmployeeServiceService)): Observable<Employee> => {
  
    const employeeId = route.paramMap.get('employeeId');

  if (employeeId) {
        return employeeService.getEmployeeById(Number(employeeId));
  } 
  else {
    const employee: Employee = {
      employeeId: 0,
      employeeName: '',
      employeeContactNumber: '',
      employeeAddress: '',
      employeeGender: '',
      employeeDepartment: '',
      employeeSkills: '',
    }
  
    return of(employee);
}
};
