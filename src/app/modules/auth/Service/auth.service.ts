import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8085/adoption';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verifica si existe el token
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token para cerrar sesión
  }


  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    return this.http.post(`${this.baseUrl}/auth/login`, body)
  }
}
