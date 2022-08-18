import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  private user :User|null = null;

  private myUser = new BehaviorSubject<User | null>(null);

  myUser$ = this.myUser.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user =>{
        this.myUser.next(user);
        localStorage.setItem('role', user.role);
      })
    );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  getAdminRole(){
    const token = localStorage.getItem('role');
    return token;
  }

  logout(){
    localStorage.removeItem('role');
    this.tokenService.removeToken();
  }
}
