import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { env } from '../../environments/environment';
import { LoginDTO, RegisterDTO } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = env.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(data: LoginDTO) {
    return this.http.post<any>(`${this.baseUrl}account/login`, data).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  register(data: RegisterDTO) {
    return this.http.post<any>(`${this.baseUrl}account/register`, data);
  }

  loggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return JSON.parse(localStorage.getItem('currentUser')!)?.token;
  }
}
