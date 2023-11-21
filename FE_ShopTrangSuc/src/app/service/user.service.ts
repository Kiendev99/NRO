
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:5000/api/user';
  Token = JSON.parse(localStorage.getItem('accessToken') || '{}');
  private httpOptions = {
    headers: new HttpHeaders().set(
      'Authorization', `Bearer ${this.Token}`
    )
  };
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get<any>(this.API_URL);

  }

  getUser(id: string): Observable<any> {
    const url = `${`http://localhost:5000/api/user/current`}/${id}`;
    return this.http.get<any>(url);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/user/?_id=${id}`, this.httpOptions);
  }
  // addProducts(product:any,  files: File[]): Observable<any> {
  //   return this.http.post<any>(`${this.API_URL}/add`, product); 
  // }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/add`, user, this.httpOptions);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(
      `${`http://localhost:5000/api/user/current`}/${user.id}`,
      user, this.httpOptions
    );
  }
}
