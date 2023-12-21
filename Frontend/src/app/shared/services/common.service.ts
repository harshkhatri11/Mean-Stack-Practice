import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient, private router: Router) { }

  getCombo(comboID: String): Observable<any> {
    const combo = { comboID: comboID };
    return this.http.post('/combo/getCombo', combo);
  }

  getDependentCombo(comboID: String, dependentComboName: string): Observable<any> {
    const dependentcombo = { comboID: comboID, dependentComboName: dependentComboName };
    return this.http.post('/combo/getDependentCombo', dependentcombo);
  }
}
