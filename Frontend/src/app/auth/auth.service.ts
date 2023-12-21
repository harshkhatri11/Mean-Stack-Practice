import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private tokenTimer: NodeJS.Timer
  private authStatusListener = new Subject<boolean>();
  private roles: any;
  private currentUserDetails: any;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getCurrentUserInfo() {
    return this.currentUserDetails;
  }

  getRoles() {
    return this.roles;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('/user/signup', authData).subscribe({
      next: (response) => {
        this.router.navigate(['/auth/login']);
        alert('User created!!!!');
      },
      error: (error) => {},
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string; roles: any }>(
        '/user/login',
        authData
      )
      .subscribe({
        next: (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.userId = response.userId;
            this.roles = response.roles;
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId, this.roles);
            this.router.navigate(['/main']);
          }
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expireIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expireIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expireIn / 1000);
      this.userId = authInformation.userId;
      this.roles = authInformation.role;
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    roles: any
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('roles', roles);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('roles');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      role: role,
    };
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  //Fetch current user info
  currentUserLoggedIn(id: string): Observable<any> {
    const user = { id: id };
    return this.http.post('/user/user-login-dtls', user);
  }

  updateUserDetails(data:any):Observable<any>{
    return this.http.patch('/user/update',data);
  }



  getPublicContent(): Observable<any> {
    return this.http.get('/user/all', {
      responseType: 'text',
    });
  }

  getUserBoard(): Observable<any> {
    return this.http.get('/user/user', {
      responseType: 'text',
    });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get('/user/mod', {
      responseType: 'text',
    });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get('/user/admin', {
      responseType: 'text',
    });
  }
}
