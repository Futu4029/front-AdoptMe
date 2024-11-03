import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {UserResponse} from "@core/adoption-model";


@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private URL_BASE = 'http://localhost:8085/';

  constructor(private http: HttpClient) {}

  // Obtener adopción por ID
  getAdoptionsById(): Observable<any> {
    const url = `${this.URL_BASE}adoption`;
    return this.http.get<any>(url);
  }

  // Buscar adopciones filtradas
  searchFilteredAdoptions(size?: string, age?: string, type?: string, gender?: string, distance?:string) : Observable<any> {
    let params = new HttpParams();
    const filters = { size, age, type, gender, distance };

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value);
      }
    });

    const url = `${this.URL_BASE}adoption/search`;
    return this.http.get<any>(url, { params }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  // Crear adopción
  createAdoption(formData: FormData): Observable<any> {
    const url = `${this.URL_BASE}adoption`;
    return this.http.post(url, formData);
  }

  // Aplicar a adopción
  applyToAdoption(adoptionRequest: any): Observable<any> {
    const url = `${this.URL_BASE}application`;
    return this.http.post(url, adoptionRequest);
  }

  // Lista negra de adopciones
  blackListAdoption(adoptionRequest: any): Observable<any> {
    const url = `${this.URL_BASE}application`;
    return this.http.put(url, adoptionRequest);
  }

  // Perfil de usuario
  userProfile(): Observable<any> {
    const url = `${this.URL_BASE}user`;
    return this.http.get<any>(url);
  }

  // Perfil de usuario por email
  obtenerPerfilPorEmail(emailRequest: string): Observable<any> {
    const url = `${this.URL_BASE}user/${emailRequest}`;
    return this.http.get<any>(url)
  }

  // Obtener aplicaciones por adopción
  getApplicationsByAdoption(adoptionId: any): Observable<any> {
    const url = `${this.URL_BASE}application/adoption/${adoptionId}`;
    return this.http.get<any>(url);
  }

  // Obtener aplicaciones por usuario
  getApplicationsByUserId(): Observable<any> {
    const url = `${this.URL_BASE}application/user`;
    return this.http.get<any>(url);
  }

  // Aceptar o rechazar candidato
  acceptOrRejectcandidato(request: any): Observable<any> {
    const url = `${this.URL_BASE}adoption`;
    return this.http.put(url, request);
  }
}
