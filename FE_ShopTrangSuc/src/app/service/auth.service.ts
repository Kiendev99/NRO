import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }
  private API_Url = `http://localhost:5000/api/user`;
  register(user: any): Observable<any> {
    return this.http.post(`${this.API_Url}/register`, user)
  }
  loggin(user: any): Observable<any> {
    return this.http.post(`${this.API_Url}/login`, user)
  }
  sendEmail(email: string): Observable<any> {
    const url = `${this.API_Url}/forgotpassword?email=${email}`;
    return this.http.get(url);
  }
  resetpassword(reset: any): Observable<any> {
    return this.http.put(`${this.API_Url}/resetpassword`, reset)
  }
  checklogin(): boolean {
    return localStorage.getItem('user') !== null || localStorage.getItem('accessToken') !== null;
  }
  isAdmin(): boolean {
    const user = localStorage.getItem('user');
    if (user && user !== 'null') {
      const parsedUser = JSON.parse(user);
      return parsedUser.role === 'admin';
    }
    return false;
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

  }
}
