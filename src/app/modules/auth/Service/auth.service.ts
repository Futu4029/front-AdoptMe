import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('tokenSession'); // Verifica si existe el token
  }

  logout() {
    localStorage.removeItem('tokenSession'); // Elimina el token para cerrar sesión
  }

  sendCredentials2(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    return this.http.post(`${this.baseUrl}/auth/login`, body)
  }

  sendCredentials(email: string, password: string): Observable<any> {
    // Simulamos la respuesta del backend
    const fakeResponse = {
      tokenSession: 'fake-token-12345', // Token simulado
      data: {
        email: email,
        password: password
      }
    };

    // Usamos 'of' para simular una respuesta exitosa del backend
    return of(fakeResponse);
}
}
