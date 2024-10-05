import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private baseUrl = 'http://localhost:8085/adoption';

  constructor(private http: HttpClient) {}

  // Metodo para obtener los headers de autorizacion
  authorizationHeader(): HttpHeaders | never {
    const token = localStorage.getItem('tokenSession');

    if (!token) {
      console.error('No se encontró el token de sesión. Asegúrate de estar autenticado.');
      throw new Error('No se encontró el token de sesión.');
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Obtener adopción por ID
  getAdoptionByemail(email: string): Observable<any> {
    const headers = this.authorizationHeader();
    const url = `${this.baseUrl}/search/by-email/${email}`;
    return this.http.get<any>(url, { headers });
  }

 /* getAdoptionByemail(): Observable<any> {
    const headers = this.authorizationHeader();

    const url = `${this.baseUrl}/${'test.user@gmail.com'}`;
    return this.http.get<any>(url, { headers });
  }*/


  // Buscar adopciones filtradas
  searchFilteredAdoptions(size?: string, age?: string, type?: string, gender?: string): Observable<any> {
    let params = new HttpParams();

    if (size) {
      params = params.append('size', size);
    }
    if (age) {
      params = params.append('age', age);
    }
    if (type) {
      params = params.append('type', type);
    }
    if (gender) {
      params = params.append('gender', gender);
    }

    const headers = this.authorizationHeader();
    const url = `${this.baseUrl}/search`;
    console.log(url + '?' + params.toString());

    return this.http.get<any>(url, { params, headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error); // O manejar el error como prefieras
      })
    );
  }

  // Crear adopción
  createAdoption(formData: FormData): Observable<any> {
    const headers = this.authorizationHeader();
    return this.http.post(`${this.baseUrl}`, formData, { headers });
  }



}
