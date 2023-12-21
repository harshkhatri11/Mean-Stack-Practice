import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllEmployees(): Observable<any> {
    return this.http.get('/user/getEmployees');
  }

  updateEmployeePersonalDetails(data: any): Observable<any> {
    return this.http.patch('/user/updateEmployeePersonalDetails', data);
  }

  updateEmployeeProfessionalData(data: any): Observable<any> {
    return this.http.patch('/user/updateEmployeeProfessionalData', data);
  }

  updateEmployeeSettinsControlsData(data:any):Observable<any>{
    return this.http.patch('/user/updateEmployeeSettingsControlsData', data);
  }

  deleteEmployee(id: any): Observable<any> {
    return this.http.delete('/user/deleteEmployee/'+ id);
  }

  isEmailExist(data:any):Observable<any>{
    return this.http.post('/user/checkEmailExist',data);
  }

  onboardEmployee(data:any):Observable<any>{
    return this.http.post('/user/onboardEmployee',data);
  }
}
