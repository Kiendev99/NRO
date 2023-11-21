// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private API_URL = 'http://localhost:5000/api/product';
//   constructor(private http: HttpClient) { }
//   getProducts(page:any, limit:any): Observable<any> {
//     return this.http.get<any>(`http://localhost:5000/api/product?page=${page}&limit=${limit}`);

//   }
//   getProduct(id: string):Observable<any> {
//     const url = `${this.API_URL}/${id}`;
//     return this.http.get<any>(url);
//   }
//   addProducts(product:any,  files: File[]): Observable<any> {
//     return this.http.post<any>(`${this.API_URL}/add`, product); 
//   }

//   updateProduct(product: any): Observable<any> {
//     return this.http.put<any>(`${this.API_URL}/${product.id}`, product);
//   }

//   deleteProduct(id: string): Observable<any> {
//     // const url = `${this.API_URL}/${id}`;
//     return this.http.delete<any>(`${this.API_URL}/${id}`);
//   }

//   searchByName(title: string): Observable<any> {
//     return this.http.get(`${this.API_URL}/search?title=${title}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'http://localhost:5000/api/product';
  Token = JSON.parse(localStorage.getItem('accessToken') || '{}');
  private httpOptions = {
    headers: new HttpHeaders().set(
      'Authorization', `Bearer ${this.Token}`
    )
  };
  constructor(private http: HttpClient) { }
  getProducts(page: any, limit: any): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/product?page=${page}&limit=${limit}`);

  }
  getProduct(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }
  addProducts(product: any, files: File[]): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/add`, product, this.httpOptions);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${product.id}`, product, this.httpOptions);
  }

  deleteProduct(id: string): Observable<any> {
    // const url = `${this.API_URL}/${id}`;
    return this.http.delete<any>(`${this.API_URL}/${id}`, this.httpOptions);
  }

  searchByName(title: string): Observable<any> {
    return this.http.get(`${this.API_URL}/search?title=${title}`);
  }
}

